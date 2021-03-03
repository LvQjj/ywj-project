<template>
  <div class="loginbtn">
    <button @click='btnclick'>{{btnMessage}}</button>
  </div>
</template>

<script>
  export default {
    props: {
      btnMessage: String
    },
    methods: {
      btnclick() {
        this.$emit('zhubtnclick');
      }
    }
  }
</script>

<style>
  .loginbtn {
    display: flex;
    margin: 0 10px;
  }
  
  .loginbtn button {
    flex: 1;
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 16px;
    background-color: #ff9eb6;
    border-radius: 22.5px;
    color: white;
    border: 0px;
  }
</style>