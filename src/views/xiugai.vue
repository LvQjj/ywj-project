<template>
  <div class="xiugai">
    <navBar></navBar>

    <div class="tou">
      <div class="toutext">头像</div>
      <div class="contentimg">
        <van-uploader class="updataimg" :after-read="afterRead" />
        <img src="../assets/img/defaultface.png" alt="" v-if='!this.model1.user_img'>
        <img :src="this.model1.user_img" alt="" v-else>
      </div>
    </div>

    <div @click='namecli'>
      <gaiItem itemMessage='昵称'>
        <div class="content1">{{this.model1.name}}</div>
      </gaiItem>
    </div>
    <gaiItem itemMessage='id'>
      <div class="content1">{{this.model1.id}}</div>
    </gaiItem>
    <div @click='sexchange'>
      <gaiItem itemMessage='性别'>
        <div class="content1">{{this.model1.gender == 1 ? '男' : '女' }}</div>
      </gaiItem>
    </div>
    <div @click='gecli'>
      <gaiItem itemMessage='个人签名'>
        <div class="content1">{{this.model1.user_desc}}</div>
      </gaiItem>
    </div>

    <van-dialog v-model="show" title="昵称" show-cancel-button overlay @confirm='sunamebtn'>
      <van-field v-model="text" autofocus :placeholder='this.model1.name' />
    </van-dialog>

    <van-dialog v-model="geshow" title="个性签名" show-cancel-button overlay @confirm='sugeqianbtn'>
      <van-field v-model="text1" autofocus :placeholder='this.model1.user_desc' />
    </van-dialog>

    <van-action-sheet v-model="showsex" :actions="actions" description="性别" overlay @select='susel' close-on-click-action/>

    <div class="exit">
      <div class="submit" @click='subclick'>提交修改</div>
      <div class="fan" @click='fanclick'>返回空间</div>
      <div class="tui" @click='tuiclick'>退出登录</div>
    </div>
  </div>
</template>

<script>
  import navBar from '../components/common/navBar.vue'
  import gaiItem from '../components/common/gaiItem.vue'

  export default {
    data() {
      return {
        model1: {},
        geshow: false,
        show: false,
        showsex: false,
        text: '',
        text1: '',
        actions: [{
          name: '男',
          val: 1
        }, {
          name: '女',
          val: 0
        }]
      }
    },
    components: {
      navBar,
      gaiItem
    },
    created() {
      this.downloaddata();
    },
    methods: {
      fanclick() {
        this.$router.push('/userinfo');
      },
      tuiclick() {
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        this.$store.state.isLogin = false;
        this.$store.commit('setNULL');
        this.$router.push('/index');
        this.$toast.success('退出成功');
      },
      sexchange() {
        this.showsex = true;
      },
      namecli() {
        this.show = true;
      },
      sunamebtn() {
        this.show = false;
        this.model1.name = this.text;
      },
      gecli() {
        this.geshow = true;
      },
      sugeqianbtn() {
        this.geshow = false;
        this.model1.user_desc = this.text1;
      },
      susel(item) {
        this.showsex = false;
        this.model1.gender = item.val;
      },
      async downloaddata() {
        const res = await this.$http.get('/user/' + localStorage.getItem('id'), {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        });
        this.model1 = res.data[0];
      },
      async subclick() {
        this.$store.commit({
          type: 'setdata',
          model1: this.model1
        });
        const res = await this.$http.post('/update/' + localStorage.getItem('id'), this.model1);
        if (res.data.code == 200) {
          this.$toast.success('上传成功');
          this.$router.replace('/userinfo');
        }
      },
      async afterRead(file) {
        const fromdata = new FormData();
        fromdata.append('file', file.file);
        const res = await this.$http.post('/upload', fromdata);
        this.model1.user_img = res.data.url;
      }
    }
  }
</script>

<style>
  .tou {
    height: 65px;
    background-color: #ffffff;
    margin-top: 12px;
    line-height: 65px;
    padding: 0 12px;
    font-size: 14px;
  }
  
  .toutext {
    color: #505050;
    font-size: 14px;
    float: left;
  }
  
  .contentimg {
    float: right;
    margin-top: 8px;
    position: relative;
  }
  
  .updataimg {
    position: absolute;
    opacity: 0;
  }
  
  .contentimg img {
    width: 46px;
    height: 46px;
    border-radius: 50%;
  }
  
  .exit div {
    height: 36px;
    line-height: 36px;
    text-align: center;
    background-color: #ffffff;
    color: #505050;
    font-size: 14px;
  }
  
  .submit {
    margin-top: 25px;
  }
  
  .exit div:nth-child(n+2) {
    margin-top: 1px;
  }
  
  .content1 {
    position: absolute;
    right: 12px;
    color: #999999;
  }
</style>