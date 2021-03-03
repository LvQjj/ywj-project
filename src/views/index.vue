<template>
  <div class="index">
    <navBar></navBar>

    <div class="categorytab">
      <div class="categorytabicon" @click='seticon'><van-icon name="setting-o" /></div>
        <van-tabs v-model='active' swipeable sticky animated> 
          <van-tab v-for="(item,index) in selectdata" :key='index' :title="item.title">
            <van-list v-model="item.loading" :finished="item.finished" finished-text="这就是我的底线" @load='onLoad' :immediate-check='false'>
              <div class="detailparent">
                <detail class="detailitem" :detailitem='citem' v-for='(citem,cindex) in item.list' :key='cindex'></detail>
              </div>
            </van-list>
          </van-tab>
        </van-tabs>
    </div>

  </div>
</template>

<script>
  import navBar from '../components/common/navBar.vue'
  import detail from '../components/common/detail.vue'

  export default {
    data() {
      return {
        selectdata: {},
        active: 0
      }
    },
    components: {
      navBar,
      detail
    },
    activated() {
      if (localStorage.getItem('newCat')) {
        let cat = JSON.parse(localStorage.getItem('newCat'));
        this.selectdata = cat.map((item, index) => {
          item.list = [];
          item.page = 0;
          item.finished = false;
          item.loading = false;
          item.pagesize = 10;
          return item;
        });
      }
      this.selectArticle();
    },
    methods: {
      async select() {
        if (localStorage.getItem('newCat')) {
          let cat = JSON.parse(localStorage.getItem('newCat'));
          this.selectdata = cat.map((item, index) => {
            item.list = [];
            item.page = 0;
            item.finished = false;
            item.loading = false;
            item.pagesize = 10;
            return item;
          });
        } else {
          const res = await this.$http.get('/category');
          this.selectdata = res.data.map((item, index) => {
            item.list = [];
            item.page = 0;
            item.finished = false;
            item.loading = false;
            item.pagesize = 10;
            return item;
          });
        }
        this.selectArticle();
      },
      async selectArticle() {
        let selitem = this.selectdata[this.active];
        selitem.finished = false;
        selitem.page = 0;
        const res = await this.$http.get('/detail/' + selitem._id, {
          params: {
            page: selitem.page,
            pagesize: selitem.pagesize
          }
        });
        selitem.list = res.data;
      },
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
      },
      seticon() {
        this.$router.push('/editcat');
      },
      async onLoad() {
        let selitem = this.selectdata[this.active];
        selitem.page += 1;
        const res = await this.$http.get('/detail/' + selitem._id, {
          params: {
            page: selitem.page,
            pagesize: selitem.pagesize
          }
        });
        selitem.list.push(...res.data);
        selitem.loading = false;
        if (res.data.length < selitem.pagesize) {
          selitem.finished = true;
        }
      }
    },
    watch: {
      active() {
        this.selectArticle();
      }
    },
    created() {
      this.select();
      this.inituser();
    }
  }
</script>

<style>
  .index {
    background-color: #ffffff;
  }
  
  .detailparent {
    margin-top: 8px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  
  .detailitem {
    width: 48%;
  }
  
  .categorytab {
    position: relative;
  }
  
  .categorytabicon {
    position: absolute;
    z-index: 5;
    right: 0;
    top: 5px;
    padding: 10px 5px;
    background-color: white;
  }
</style>