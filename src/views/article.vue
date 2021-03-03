<template>
  <div class="backcolor">
    <navBar></navBar>

    <div class="video">
      <video controls src="https://cdn.cnbj1.fds.api.mi-img.com/product-images/mi10ultra/index_08.mp4"></video>
    </div>

    <div class="artdownload" @click='download'>打开App,流畅又高清</div>

    <articleuserinfo></articleuserinfo>

    <div class="detailparent">
      <detail class="detailitem" :detailitem='citem' v-for='(citem,cindex) in detaillist' :key='cindex'></detail>
    </div>

    <commenttitle @supost='postcomment'></commenttitle>

    <comment @erjihuifu='erjihuifu1' ref="commentpublic"></comment>

  </div>
</template>

<script>
  import navBar from '../components/common/navBar.vue'
  import detail from '../components/common/detail.vue'
  import articleuserinfo from '../components/article/articleuserinfo.vue'
  import commenttitle from '../components/article/commenttitle.vue'
  import comment from '../components/article/comment.vue'

  export default {
    data() {
      return {
        detaillist: [],
        postcom: {
          article_id: 23,
          comment_content: null,
          comment_date: null,
          parent_id: null
        },
      }
    },
    methods: {
      download() {
        this.$router.push('/download');
      },
      async commenddata() {
        const res = await this.$http.get('/commend');
        this.detaillist = res.data;
      },
      getdate() {
        let date = new Date();
        let d = date.getDay();
        let m = date.getMonth() + 1;
        if (d < 10) {
          d = '0' + d;
        }
        if (m < 10) {
          m = '0' + m;
        }
        return m + '-' + d;
      },
      async postcomment(content) {
        this.postcom.comment_date = this.getdate();
        this.postcom.comment_content = content;
        const res = await this.$http.post('/comment_post/' + localStorage.getItem('id'), this.postcom, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        });
        this.$refs.commentpublic.commentdata();
      },
      async erjihuifu1(mess) {
        this.postcom.parent_id = mess.id;
        this.postcom.comment_content = mess.text;
        this.postcom.comment_date = this.getdate();
        const res = await this.$http.post('/comment_post/' + localStorage.getItem('id'), this.postcom, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        });
        this.$refs.commentpublic.commentdata();
      }
    },
    created() {
      this.commenddata();
    },
    watch: {
      $route() {
        this.commenddata();
      },
      async '$store.state.mess.id' () {
        this.postcom.parent_id = this.$store.state.mess.id;
        this.postcom.comment_content = this.$store.state.mess.text;
        this.postcom.comment_date = this.getdate();
        const res = await this.$http.post('/comment_post/' + localStorage.getItem('id'), this.postcom, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        });
        this.$refs.commentpublic.commentdata();
      }
    },
    components: {
      navBar,
      detail,
      articleuserinfo,
      commenttitle,
      comment
    }
  }
</script>

<style>
  .backcolor {
    background-color: white;
  }
  
  .artdownload {
    background-color: #fb7299;
    text-align: center;
    height: 35px;
    line-height: 35px;
    border-radius: 20px;
    font-size: 14px;
    color: white;
    margin: 10px 10px;
  }
  
  .video {
    width: 100%;
  }
  
  .video video {
    width: 100%;
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
</style>