<template>
  <div class="erji">

    <div class="comment" v-for='(item,index) in commentchild' :key='index' v-if='item.userinfo'>
      <div class="userface">
        <img :src="item.userinfo.user_img" alt="">
        <p>
          <span>{{item.userinfo.name}}</span>
          <span>{{item.comment_date}}</span>
        </p>
      </div>
      <div class="usercontent">
        <div v-if='temp'>
          回复<span style='color: #00a1d6'>{{item.parent_user_info.name}}</span>:  
          {{item.comment_content}}
          <span class='huifu' @click='nhuifu(item.comment_id)'>回复</span>
        </div>
        <div v-else>
          {{item.comment_content}}
          <span class='huifu' @click='nhuifu(item.comment_id)'>回复</span>
        </div>
      </div>
      <commentchilditem :commentchild='item.child' :temp='true'></commentchilditem>
    </div>

    <van-dialog v-model="show" title="回复" overlay @confirm='suhuifu' show-cancel-button>
      <van-field v-model="mess.text" autofocus placeholder='请输入回复内容' />
    </van-dialog>

  </div>
</template>

<script>
  export default {
    name: 'commentchilditem',
    props: ['commentchild', 'temp'],
    data() {
      return {
        show: false,
        mess: {
          text: '',
          id: 0
        }
      }
    },
    methods: {
      nhuifu(id) {
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
        this.$store.commit({
          type: 'setnid',
          mess: this.mess
        });
      }
    }
  }
</script>

<style>
  .erji .comment {
    display: flex;
    flex-direction: column;
  }
  
  .erji .userface {
    display: flex;
    align-items: center;
  }
  
  .erji .userface img {
    width: 20px;
    height: 20px;
    margin-bottom: 5px;
  }
  
  .erji .userface p {
    display: flex;
    flex: 1;
    margin: 0 10px 5px 8px;
    justify-content: space-between;
    align-items: center;
  }
  
  .erji .userface p span {
    color: #777;
    font-size: 13px;
  }
  
  .usercontent div {
    padding-right: 20px;
  }
</style>