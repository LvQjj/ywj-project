<template>
  <div class="gaiitem">
    <div class="text1">{{itemMessage}}</div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      itemMessage: String,
    }
  }
</script>

<style>
  .gaiitem {
    height: 38px;
    margin-top: 1px;
    background-color: #ffffff;
    line-height: 38px;
    font-size: 14px;
    position: relative;
  }
  
  .gaiitem .text1 {
    position: absolute;
    left: 12px;
    color: #505050;
  }
</style>