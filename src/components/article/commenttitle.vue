<template>
  <div>

    <div class="commenttitle">
      <span>评论</span>
      <span>({{this.$store.state.length}})</span>
    </div>

    <div class="usercomment">
      <img src="../../assets/img/defaultface.png" alt="" v-if='!this.$store.state.userdata.user_img'>
      <img :src="this.$store.state.userdata.user_img" alt="" v-else>
      <input type="text" placeholder="说点什么吧" v-model='commentcontent'>
      <button @click='submit'>发表</button>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        jin: true,
        commentcontent: ''
      }
    },
    methods: {
      submit() {
        if (this.$store.state.isLogin == true) {
          this.$emit('supost', this.commentcontent);
          this.commentcontent = '';
        } else {
          this.$store.commit({
            type: 'setURL',
            URL: this.$route.path
          });
          this.$toast.fail('请先登录');
          this.$router.push('/denglu');
        }
      }
    }
  }
</script>

<style>
  .commenttitle {
    margin: 30px 0px 15px 8px;
  }
  
  .commenttitle span:nth-child(2) {
    margin-left: 8px;
    color: #aaa;
  }
  
  .usercomment {
    display: flex;
    margin-bottom: 15px;
  }
  
  .usercomment img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 0 10px;
  }
  
  .usercomment input {
    flex: 8;
    height: 26px;
    border-radius: 13px;
    border: 0px;
    background-color: #f4f4f4;
    padding-left: 10px;
    line-height: 20px;
    font-size: 13px;
    align-self: center;
    margin-right: 8px;
  }
  
  .usercomment button {
    flex: 1.5;
    align-self: center;
    height: 26px;
    border: 0;
    background-color: #fb7299;
    margin-right: 12px;
    font-size: 12px;
    color: white;
    border-radius: 13px;
    padding: 0 12px;
  }
</style>