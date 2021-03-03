<template>
  <div class="loginAccount">
    <van-field v-model="text" type="text" :label="loginNumber" :placeholder="placeholder1" />
    <van-field v-model="password" type="password" :label="loginPassword" :placeholder="placeholder2" />
  </div>
</template>

<script>
  export default {
    props: {
      loginPassword: String,
      loginNumber: String,
      placeholder1: String,
      placeholder2: String
    },
    data() {
      return {
        password: '',
        text: ''
      }
    },
    methods: {
      shuru1() {
        let rule = /^.{6,16}$/;
        if (rule.test(this.text)) {
          this.$emit('inputchange', this.text);
        }
      },
      shuru2() {
        let rule = /^.{6,16}$/;
        if (rule.test(this.password)) {
          this.$emit('passwordchange', this.password);
        }
      }
    },
    watch: {
      text() {
        this.shuru1();
      },
      password() {
        this.shuru2();
      }
    }
  }
</script>

<style>
  .loginAccount {
    margin-bottom: 15px;
  }
</style>