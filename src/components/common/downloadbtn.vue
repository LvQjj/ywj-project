<template>
  <div class="download">
      <button @click='btnclick'>{{downloadMessage}}</button>
  </div>
</template>

<script>
  export default {
    props: {
      downloadMessage: String
    },
    methods: {
      btnclick() {
        this.$router.push('/download');
      }
    },
  }
</script>

<style>
  .download {
    height: 44px;
  }
  
  .download button {
    height: 24px;
    margin: 10px 0 0 8px;
    font-size: 10px;
    background-color: #fb7299;
    border: 0;
    border-radius: 5px;
    color: white;
    line-height: 24px;
  }
</style>