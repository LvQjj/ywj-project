<template>
  <div v-if='this.model'>
    <van-collapse v-model="activeNames" :border='false' @change='tagchange'>
      <van-collapse-item name="1" :border='false'>
        <template #title>
          <div class="textshow">
            <span class="title">{{model.category.title}}</span>
            <span class="name1" :style='{whiteSpace: iswrap}'>{{model.name}}</span>
          </div>
          <div class="closecontent">
            <img :src="this.model.userinfo.user_img" alt="" v-if='panduan1()'>
            <img src="../../assets/img/defaultface.png" alt="" v-else>
            <div class="username">{{model.userinfo.name}}</div>
            <div class="rightcontent">
              <div @click.stop='guanzhu' :class='{  ispink:suguanzhu }'>
                <van-icon name="good-job" :color='suguanzhu ? "#fb7399" : "#757575"' size='21' class="icon" />
                <span>关注</span>
              </div>
              <div @click.stop='shoucang' :class='{  ispink:sushoucang }'>
                <van-icon name="star" :color='sushoucang ? "#fb7399" : "#757575"' size='21' class="icon" />
                <span>收藏</span>
              </div>
              <div>
                <van-icon name="add-square" color='#757575' size='21' class="icon" />
                <span>缓存</span>
              </div>
            </div>
          </div>
        </template>
<div class="neirong">
  <span>日期:{{model.date}}</span>
  <span>观看:131.3万次</span>
  <span>弹幕:3.4万</span>
</div>
</van-collapse-item>
</van-collapse>
</div>
</template>

<script>
  export default {
    data() {
      return {
        suguanzhu: null,
        sushoucang: null,
        model: null,
        activeNames: [],
        iswrap: 'nowrap'
      }
    },
    created() {
      this.articleitemdata();
      setTimeout(() => {
        this.shoucanginit();
        this.guanzhuinit();
      }, 2000);
    },
    watch: {
      $route() {
        this.articleitemdata();
      }
    },
    methods: {
      panduan1() {
        if (this.model.userinfo.user_img == null) {
          return false
        } else {
          return true
        }
      },
      tagchange() {
        if (this.iswrap == 'nowrap') {
          this.iswrap = 'normal';
        } else {
          this.iswrap = 'nowrap';
        }
      },
      async articleitemdata() {
        const res = await this.$http.get('/article/14');
        this.model = res.data[0];
      },
      async shoucang() {
        if (this.$store.state.isLogin) {
          const res = await this.$http.post('/collection/' + localStorage.getItem('id'), {
            article_id: this.$route.params.id
          });
          if (res.data.msg != '取消收藏成功') {
            this.$toast.success('收藏成功');
            this.sushoucang = true;
          } else {
            this.$toast.fail('取消收藏');
            this.sushoucang = false;
          }
        } else {
          this.sushoucang = false;
        }
      },
      async shoucanginit() {
        if (this.$store.state.isLogin) {
          const res = await this.$http.get('/collection/' + localStorage.getItem('id'), {
            params: {
              article_id: this.$route.params.id
            }
          });
          this.sushoucang = res.data.success;
        }
      },
      async guanzhu() {
        if (this.$store.state.isLogin) {
          const res = await this.$http.post('/sub_scription/' + localStorage.getItem('id'), {
            sub_id: this.model.userid
          });
          if (res.data.msg == '关注成功') {
            this.$toast.success('关注成功');
            this.suguanzhu = true;
          } else {
            this.$toast.fail('取消关注');
            this.suguanzhu = false;
          }
        } else {
          this.suguanzhu = false;
        }
      },
      async guanzhuinit() {
        if (this.$store.state.isLogin) {
          const res = await this.$http.get('/sub_scription/' + localStorage.getItem('id'), {
            params: {
              sub_id: this.model.userid
            }
          });
          this.suguanzhu = res.data.success;
        }
      }
    }
  }
</script>

<style>
  .ispink span {
    color: #fb7399!important;
  }
  
  .neirong span:nth-child(n+2) {
    margin-left: 10px;
  }
  
  .username {
    margin-top: 2px;
    margin-left: 6px;
    font-size: 10px;
  }
  
  .rightcontent {
    position: absolute;
    right: -20px;
    display: flex;
  }
  
  .rightcontent div {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  
  .rightcontent span {
    margin-top: 4px;
    font-size: 10px;
    color: #757575;
  }
  
  .icon:nth-child(n+2) {
    margin-left: 15px;
  }
  
  .closecontent {
    margin-top: 6px;
    display: flex;
    align-items: center;
    position: relative;
  }
  
  .closecontent img {
    width: 18px;
    height: 18px;
    border: 1px solid #999;
    border-radius: 50%;
  }
  
  .textshow {
    display: flex;
  }
  
  .title {
    width: 45px;
    text-align: center;
    height: 20px;
    background-color: #f4f4f4;
    color: #fb7299;
    border-radius: 10px;
  }
  
  .textshow .name1 {
    width: 260px;
    white-space: nowrap;
    padding-left: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  
  .van-cell::after {
    border: 0px;
  }
</style>