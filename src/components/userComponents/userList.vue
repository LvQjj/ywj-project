<template>
  <div class="userlist">
    <div class="nolist">
      <img src="../../assets/img/nolist.png" alt="">
    </div>
  </div>
</template>
<script>
  export default {

  }
</script>
<style>
  .userlist {
    height: 320px;
    background-color: #ffffff;
  }
  
  .nolist {
    display: flex;
    padding: 85px 0 16px 50px;
    justify-content: center;
    align-items: center;
  }
  
  .userlist .nolist img {
    height: 160px;
    width: 280px;
    margin-bottom: 15px;
  }
</style>