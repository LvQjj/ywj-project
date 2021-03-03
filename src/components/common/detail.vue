<template>
  <div class="detail" @click='detailclick'>
    <img :src="detailitem.img" alt="" class="detailimg" v-if='panduan()'>
    <div class="count">
      <span class="vicon"><van-icon name="video-o" />1233</span>
      <span class="oicon"><van-icon name="orders-o" />{{!this.detailitem.commentlen ? 66 : this.detailitem.commentlen}}</span>
    </div>
    <p class="detailp">{{detailitem.name}}</p>
  </div>
</template>

<script>
  export default {
    props: {
      detailitem: Object
    },
    methods: {
      panduan() {
        if (this.detailitem.img == "https://node.12380ch.com/upload/file-1587712318330.jpg") {
          this.detailitem.img = "https://i0.hdslb.com/bfs/archive/f0882d20aebbc973136796475e5d76afb1d6082d.jpg@480w_270h_1c.webp";
          return true;
        } else {
          return true;
        }
      },
      detailclick() {
        let nowrouter = '/article/' + this.detailitem.id;
        if (nowrouter == this.$route.path) {
          return;
        } else {
          this.$router.push(nowrouter);
        }
      }
    }
  }
</script>

<style>
  .detail {
    position: relative;
  }
  
  .detailimg {
    width: 100%;
  }
  
  .detailp {
    font-size: 12px;
    margin-top: 1px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .count {
    position: absolute;
    background: linear-gradient(0deg, rgba(0, 0, 0, .85), transparent);
    height: 27px;
    width: 100%;
    bottom: 32px;
  }
  
  .count span {
    font-size: 10px;
    color: white;
  }
  
  .count .vicon {
    position: absolute;
    left: 4px;
    bottom: 5px;
  }
  
  .count .oicon {
    position: absolute;
    right: 4px;
    bottom: 5px;
  }
</style>