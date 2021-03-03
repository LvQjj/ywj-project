<template>
  <div>
    <navBar></navBar>
    <userSpace></userSpace>
    <useNav message1='动态' message2='视频'></useNav>
  </div> 
</template>
<script>
  import navBar from '../components/common/navBar.vue'
  import userSpace from '../components/userComponents/userSpace.vue'
  import useNav from '../components/userComponents/userNav.vue'

  export default {
    components: {
      navBar,
      userSpace,
      useNav
    },
    methods: {
      async inituser() {
        if (localStorage.getItem('id') && localStorage.getItem('token')) {
          const res = await this.$http.get('/user/' + localStorage.getItem('id'), {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
          });
          this.$store.commit({
            type: 'setdata',
            model1: res.data[0]
          });
        }
      }
    },
    created() {
      this.inituser();
    }
  }
</script>
<style>

</style>