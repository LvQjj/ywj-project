import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    userdata: {},
    length: 0,
    mess: {
      id: 0,
      text: ''
    },
    beforerouter: ''
  },
  mutations: {
    setdata(state, payload) {
      state.isLogin = true;
      state.userdata = payload.model1;
    },
    setlength(state, payload) {
      state.length = payload.model;
    },
    setnid(state, payload) {
      state.mess.id = payload.mess.id;
      state.mess.text = payload.mess.text;
    },
    setURL(state, payload) {
      state.beforerouter = payload.URL;
    },
    setNULL(state) {
      state.userdata = {};
    }
  },
  getters: {
    commentlength(state) {
      return state.commentlist.length;
    }
  },
  actions: {},
  modules: {}
})