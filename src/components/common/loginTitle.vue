<template>
  <div class="loginTitle">
    <div></div>
    <div>{{loginTop}}</div>
    <div class="qihuan" @click='qihuanye'>{{qihuan}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      loginTop: String,
      qihuan: String
    },
    methods: {
      qihuanye() {
        if (this.$route.path === '/denglu') {
          this.$router.push('/zhuce');
        } else {
          this.$router.push('/denglu');
        }
      }
    }
  }
</script>

<style>
  .loginTitle {
    text-align: center;
    height: 50px;
    line-height: 50px;
    background-color: #ffffff;
    font-size: 16px;
    display: flex;
  }
  
  .loginTitle div {
    flex: 1;
  }
  
  .qihuan {
    font-size: 12px;
  }
</style>