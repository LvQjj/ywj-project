<template>
  <div class="navbar">
    <div class="logo">
      <img src="../../assets/img/logo.png" alt="" @click='logoclick'>
    </div>
    <div class="right">
      <div class="seach">
        <img src="../../assets/img/seachlogo.png" alt="" @click='seachclick'>
      </div>
      <div class="face" @click='imgclick'>
        <img src="../../assets/img/defaultface.png" alt="" v-if='!$store.state.userdata.user_img'>
        <img :src="$store.state.userdata.user_img" alt="" v-else>
      </div>
      <div class="download">
        <downloadbtn downloadMessage='下载App'></downloadbtn>
      </div>
    </div>
  </div>
</template>

<script>
  import downloadbtn from './downloadbtn.vue'

  export default {
    components: {
      downloadbtn
    },
    methods: {
      logoclick() {
        this.$router.push('/index');
      },
      seachclick() {
        console.log('搜索被点击了');
      },
      imgclick() {
        if (!this.$store.state.isLogin) {
          this.$router.push('/denglu');
        } else if (this.$route.path !== '/userinfo/dongtai' && this.$route.path !== '/userinfo/shipin') {
          this.$router.push('/userinfo');
        }
      },
      async inituser() {
        if (localStorage.getItem('id') && localStorage.getItem('token')) {
          const res = await this.$http.get('/user/' + localStorage.getItem('id'), {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
          });
          this.$store.commit({
            type: 'setdata',
            model1: res.data[0]
          });
        }
      }
    },
    created() {
      this.inituser();
    }
  }
</script>

<style>
  .navbar {
    display: flex;
    height: 44px;
    background-color: #ffffff;
    position: relative;
  }
  
  .logo img {
    height: 44px;
  }
  
  .right {
    display: flex;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    padding-right: 12px;
  }
  
  .seach img {
    height: 22px;
    width: 22px;
    margin: 12px 22px 0 0;
  }
  
  .face img {
    margin: 10px 12px 0 0;
    height: 24px;
    width: 24px;
    border-radius: 50%;
  }
</style>