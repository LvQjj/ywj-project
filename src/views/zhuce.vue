<template>
  <div class="zhuce">
    <loginTitle loginTop='注册bilibili' qihuan='登录'></loginTitle>
    <loginText name='用户名' placeholder='请输入用户名' @namechange='suname'></loginText>
    <loginAccount loginNumber='账号' loginPassword='密码' placeholder1='请输入账号' placeholder2='请输入密码' @inputchange='suinput' @passwordchange='supassword'></loginAccount>
    <loginbtn btnMessage='注册' @zhubtnclick='suzhu'></loginbtn>
  </div>
</template>

<script>
  import loginTitle from '../components/common/loginTitle.vue'
  import loginText from '../components/common/loginText.vue'
  import loginAccount from '../components/common/loginAccount.vue'
  import loginbtn from '../components/common/loginbtn.vue'

  export default {
    components: {
      loginTitle,
      loginText,
      loginAccount,
      loginbtn
    },
    data() {
      return {
        model: {
          name: '',
          username: '',
          password: ''
        }
      }
    },
    methods: {
      suinput(tusename) {
        this.model.username = tusename;
      },
      supassword(tpassword) {
        this.model.password = tpassword;
      },
      suname(tname) {
        this.model.name = tname;
      },
      async suzhu() {
        let rule = /^.{6,16}$/;
        if (rule.test(this.model.username) && rule.test(this.model.password) && rule.test(this.model.name)) {
          var res = await this.$http.post('/register', this.model);
          this.$toast.fail(res.data.msg);
          if (res.data.code === 200) {
            this.$router.replace('/denglu');
          }
        } else {
          this.$toast.fail('注册失败');
        }
      }
    }
  }
</script>

<style>

</style>