<template>
  <div>
    <nav-bar></nav-bar>
    <van-divider dashed :style="{ color: '#1a73e8', borderColor: '#1a73e8', padding: '0 16px' }">现有栏目</van-divider>
    <div class="new-category newcategory">
      <p @click="handleCategoryClick(index)" v-for="(item,index) in newCat" :key="index">{{item.title}}</p>
    </div>
    <van-divider dashed :style="{ color: '#ee0a24', borderColor: '#ee0a24', padding: '0 16px' }">已删除栏目</van-divider>
    <div class="new-category delcategory">
      <p @click="deleteCategoryClick(index)" v-for="(item,index) in delCat" :key="index">{{item.title}}</p>
    </div>
    <div class="fan1" @click='fanclick'>返回空间</div>
  </div>
</template>

<script>
  import navBar from '../components/common/navBar.vue'

  export default {
    components: {
      navBar
    },
    data() {
      return {
        newCat: [],
        delCat: []
      }
    },
    methods: {
      async SelectCategory() {
        const res = await this.$http.get('/category');
        this.newCat = res.data;
      },
      handleCategoryClick(index) {
        if (this.newCat.length < 4) {
          this.$toast.fail('最少保留三个栏目')
          return
        }
        this.delCat.push(this.newCat[index]);
        this.newCat.splice(index, 1);
      },
      deleteCategoryClick(index) {
        this.newCat.push(this.delCat[index]);
        this.delCat.splice(index, 1);
      },
      fanclick() {
        this.$router.push('/index');
      }
    },
    watch: {
      newCat() {
        localStorage.setItem('newCat', JSON.stringify(this.newCat))
        localStorage.setItem('delCat', JSON.stringify(this.delCat))
      }
    },
    created() {
      if (localStorage.getItem('newCat') && localStorage.getItem('delCat')) {
        this.newCat = JSON.parse(localStorage.getItem('newCat'))
        this.delCat = JSON.parse(localStorage.getItem('delCat'))
        return
      }
      this.SelectCategory();
    }
  }
</script>

<style>
  .new-category {
    padding: 0 2.778vw;
    display: flex;
    flex-wrap: wrap;
  }
  
  .new-category p {
    width: 20%;
    text-align: center;
    margin: 1.389vw 1.944vw;
    padding: 1.944vw 0vw;
  }
  
  .newcategory p {
    color: #1a73e8;
    border: 0.278vw solid #1a73e8;
  }
  
  .delcategory p {
    color: #ee0a24;
    border: 0.278vw solid #ee0a24;
  }
  
  .fan1 {
    width: 100%;
    height: 36px;
    line-height: 36px;
    text-align: center;
    background-color: #ffffff;
    color: #505050;
    font-size: 14px;
    margin-top: 20px;
    position: fixed;
    bottom: 260px;
  }
</style>