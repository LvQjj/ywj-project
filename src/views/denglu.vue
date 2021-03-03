<template>
  <div class="denglu">
    <loginTitle loginTop='登录bilibili' qihuan='注册'></loginTitle>
    <loginAccount class="account" loginNumber='账号' loginPassword='密码' placeholder1='请输入账号' placeholder2='请输入密码' @inputchange='suinput' @passwordchange='supassword'></loginAccount>
    <loginbtn btnMessage='登录' @zhubtnclick='suzhu'></loginbtn>
  </div>
</template>
<script>
  import loginTitle from '../components/common/loginTitle.vue'
  import loginAccount from '../components/common/loginAccount.vue'
  import loginbtn from '../components/common/loginbtn.vue'

  export default {
    components: {
      loginTitle,
      loginAccount,
      loginbtn
    },
    data() {
      return {
        model: {
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
      async suzhu() {
        let rule = /^.{6,16}$/;
        if (rule.test(this.model.username) && rule.test(this.model.password)) {
          let res = await this.$http.post('/login', this.model);
          this.$toast.fail(res.data.msg);
          if (res.data.code === 200) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('id', res.data.id);
            const res1 = await this.$http.get('/user/' + localStorage.getItem('id'), {
              headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
              }
            });
            this.model1 = res1.data[0];
            this.$store.commit({
              type: 'setdata',
              model1: this.model1
            });
            if (!this.$store.state.beforerouter) {
              this.$router.replace('/index');
            } else {
              this.$router.replace(this.$store.state.beforerouter);
            }
          }
        } else {
          this.$toast.fail('登录失败');
        }
      }
    }
  }
</script>
<style>
  .account {
    margin: 15px 0;
  }
</style>