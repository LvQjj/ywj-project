<template>
  <div class="userspace">
    <div class="backgroundimg"></div>

    <div class="part1">
      <div class="face1">
        <img src="../../assets/img/defaultface.png" alt="" v-if='!$store.state.userdata.user_img'>
        <img :src="$store.state.userdata.user_img" alt="" v-else>
      </div>
      <userRelation></userRelation>
    </div>

    <div class="part2">
      <div class="base" v-if='panduan()'>{{$store.state.userdata.name}}</div>
      <div class="base" v-else>请先登陆</div>
      <div class="content">
        <div v-if='panduan1()'>这个人很神秘，什么都没有写</div>
        <div v-else>{{$store.state.userdata.user_desc}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import userRelation from './userRelation.vue'

  export default {
    components: {
      userRelation
    },
    methods: {
      panduan() {
        return this.$store.state.isLogin;
      },
      panduan1() {
        if (this.$store.state.isLogin && this.$store.state.userdata.user_desc !== null) {
          return false
        } else {
          return true
        }
      }
    }
  }
</script>

<style>
  .backgroundimg {
    height: 90px;
    background-image: url(../../assets/img/userspacebackground.png);
    background-position: center center;
    background-size: cover;
    overflow: hidden;
  }
  
  .part1 {
    padding: 0 12px;
    display: flex;
    background-color: #ffffff;
  }
  
  .face1 {
    height: 85px;
    width: 85px;
    position: relative;
  }
  
  .face1 img {
    position: absolute;
    bottom: 8px;
    height: 85px;
    width: 85px;
    border-radius: 50%;
  }
  
  .part2 {
    height: 52px;
    padding: 12px;
    background-color: #ffffff;
  }
  
  .base {
    margin-top: 5px;
    margin-bottom: 12px;
    height: 20px;
    line-height: 20px;
    font-size: 20px;
    color: #212121;
  }
  
  .content {
    margin-top: 8px;
    height: 17px;
    line-height: 17px;
    font-size: 12px;
    color: #999;
    position: relative;
  }
  
  .more {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-top: 7px;
    color: #1389bf;
  }
  
  .uid {
    font-size: 12px;
    color: black;
    height: 20px;
    margin-top: 5px;
  }
</style>