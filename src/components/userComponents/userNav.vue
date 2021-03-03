<template>
  <div>
    <div class="usernav">
      <span :class="{ active1: isactive1,active2: isactive2 }" @click='cl1click'>{{message1}}</span>
      <span :class="{ active1: isactive2,active2: isactive1 }" @click='cl2click'>{{message2}}</span>
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      message1: String,
      message2: String
    },
    data() {
      return {
        isactive1: true,
        isactive2: false
      }
    },
    methods: {
      cl1click() {
        if (!this.isactive1) {
          this.isactive1 = true;
          this.isactive2 = false;
          this.$router.replace('/userinfo/dongtai');
        }
      },
      cl2click() {
        if (!this.isactive2) {
          this.isactive1 = false;
          this.isactive2 = true;
          this.$router.replace('/userinfo/shipin');
        }
      }
    }
  }
</script>

<style>
  .usernav {
    margin: 2px 0;
    background-color: #ffffff;
    height: 40px;
    padding-left: 12px;
  }
  
  .usernav span {
    line-height: 40px;
    height: 40px;
    margin-right: 32px;
    font-size: 14px;
  }
  
  .active1 {
    color: #fb7299;
  }
  
  .active2 {
    color: #757575;
  }
</style>