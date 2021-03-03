<template>
  <div class="download1">
    <img src="../assets/img/downloadbackground.png" alt="" class="downback">
    <img src="../assets/img/downloadlogo1.png" alt="" class="logo1">
    <img src="../assets/img/downloadlogo2.png" alt="" class="logo2">
    <img src="../assets/img/titlelogo.png" alt="" class="logo3">
    <img src="../assets/img/downloadbtnlogo.png" alt="" class="logo4">
  </div>
</template>

<script>
  export default {

  }
</script>

<style>
  .download1 {
    height: 100%;
    width: 100%;
  }
  
  .downback {
    overflow: hidden;
    height: 100%;
    width: 100%;
    position: relative;
  }
  
  .logo1 {
    float: left;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 160px;
    height: 200px;
  }
  
  .logo2 {
    float: right;
    position: absolute;
    top: 0;
    right: 0;
    width: 120px;
    height: 94px;
  }
  
  .logo3 {
    float: left;
    position: absolute;
    margin: -95px 0px 0px -100px;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 48px;
  }
  
  .logo4 {
    float: left;
    position: absolute;
    margin: -25px 0px 0px -135px;
    top: 50%;
    left: 50%;
    width: 270px;
    height: 50px;
  }
</style>