<template>
  <div class="relation">
    <div class="count1">
      <span class="fan">
        <span class="num">0</span><br>
        <span>粉丝</span>
      </span>
      <span class="split"></span>
      <span class="follow">
        <span class="num">0</span><br>
        <span>关注</span>
      </span>
      <span class="split"></span>
      <span class="likes">
        <span class="num">0</span><br>
        <span>获赞</span>
      </span>
    </div>
    <div class="gai">
      <div @click='gaiclick'>编辑资料</div>
    </div>
</div>
</template>

<script>
  export default {
    methods: {
      gaiclick() {
        if (this.$store.state.isLogin) {
          this.$router.push('/xiugai');
        } else {
          this.$toast.fail('请先登录');
          this.$store.commit({
            type: 'setURL',
            URL: this.$route.path
          });
          this.$router.push('/denglu');
        }
      }
    }
  }
</script>

<style>
  .relation {
    height: 70px;
    width: 220px;
    position: absolute;
    right: 0;
    padding-top: 8px;
  }
  
  .gai {
    height: 30px;
    line-height: 30px;
  }
  
  .relation .gai div {
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 6px;
    border: 1px solid #fc8eae;
    color: #fc8eae;
    font-size: 14px;
    margin-top: 12px;
    margin-right: 10px;
  }
  
  .count1 {
    font-size: 10px;
    color: #999999;
    height: 30px;
    display: flex;
    margin-right: 12px;
  }
  
  .num {
    color: #212121;
  }
  
  .count1 span:nth-child(2n-1) {
    flex: 1;
    text-align: center;
  }
  
  .split {
    background-color: #e7e7e7;
    height: 16px;
    width: 1px;
    margin-top: 7px;
  }
</style>