<template>
  <div>

    <div v-for='(item,index) in commentlist' :key='index' class="yiji">
      <div class="comment" v-if='item.userinfo'>
        <div class="userface">
          <img :src="item.userinfo.user_img" alt="">
        </div>
        <div class="usercontent">
          <p>
            <span>{{item.userinfo.name}}</span>
            <span>{{item.comment_date}}</span>
          </p>
          <div>
            {{item.comment_content}}
            <span class='huifu' @click='huifu(item.comment_id)'>回复</span>
          </div>
        </div>
      </div>
      <div style='padding-left: 30px'> 
        <commentitem :commentchild='item.child'></commentitem>
      </div>
    </div>

    <van-dialog v-model="show" title="回复" overlay @confirm='suhuifu' show-cancel-button>
      <van-field v-model="mess.text" autofocus placeholder='请输入回复内容' />
    </van-dialog>

  </div>
</template>

<script>
  import commentitem from './commentitem.vue'

  export default {
    data() {
      return {
        commentlist: null,
        show: false,
        mess: {
          text: '',
          id: 0
        }
      }
    },
    components: {
      commentitem
    },
    methods: {
      async commentdata() {
        const res = await this.$http.get('/comment/23');
        this.changecommentdata(res.data);
        this.$store.commit({
          type: 'setlength',
          model: res.data.length
        });
      },
      changecommentdata(arr) {
        function fn(temp) {
          let arr1 = [];
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].parent_id == temp) {
              arr1.push(arr[i]);
              arr[i].child = fn(arr[i].comment_id)
            }
          }
          return arr1;
        }
        const res = fn(null);
        this.commentlist = res;
      },
      huifu(id) {
        if (this.$store.state.isLogin) {
          this.show = true;
          this.mess.id = id;
        } else {
          this.$toast.fail('请先登录');
          this.$store.commit({
            type: 'setURL',
            URL: this.$route.path
          });
          this.$router.push('/denglu');
        }
      },
      suhuifu() {
        this.show = false;
        this.$emit('erjihuifu', this.mess)
        this.mess.text = '';
        this.mess.id = 0;
      }
    },
    created() {
      this.commentdata();
    }
  }
</script>

<style>
  .yiji {
    border-bottom: 1px solid #e7e7e7;
  }
  
  .huifu {
    position: absolute;
    right: 15px;
    color: red;
  }
  
  .comment {
    margin-top: 12px;
    display: flex;
  }
  
  .userface img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-left: 10px;
  }
  
  .usercontent {
    flex: 1;
  }
  
  .usercontent p {
    display: flex;
    margin: 0 10px 5px 8px;
    justify-content: space-between;
  }
  
  .usercontent p span {
    color: #777;
    font-size: 13px;
  }
  
  .usercontent div {
    margin: 0 10px 15px 10px;
    font-size: 13px;
  }
</style>