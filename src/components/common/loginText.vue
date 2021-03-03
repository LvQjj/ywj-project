<template>
  <div class="logintext">
    <van-field v-model="textName" type='text' :label="name" :placeholder="placeholder" />
  </div>
</template>

<script>
  export default {
    props: {
      name: String,
      placeholder: String
    },
    data() {
      return {
        textName: '',
      }
    },
    methods: {
      shuru3() {
        let rule = /^.{6,16}$/;
        if (rule.test(this.textName)) {
          this.$emit('namechange', this.textName);
        }
      }
    },
    watch: {
      textName() {
        this.shuru3();
      }
    }
  }
</script>

<style>
  .logintext {
    margin: 15px 0;
  }
</style>