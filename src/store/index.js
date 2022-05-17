import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import users from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    baseUrl: 'http://localhost:3333',
    token_expired: localStorage.getItem('token_expired'),
    isMobile: false,
    leftdrawer: true,
    rightdrawer: true,
  },
  getters: {
    isAuth: state => {
      return state.token != "null" && state.token != null
    }
  },
  mutations: {
    SET_ISMOBILE(state, payload) {
      state.isMobile = payload
    },
    SET_TOKEN(state, payload) {
      state.token = payload
    },
    SET_TOKEN_EXPIRED(state, payload) {
      state.token_expired = payload
    },
    SET_LEFTDRAWER(state, payload) {
      state.leftdrawer = payload
    },
    SET_RIGHTDRAWER(state, payload) {
      state.rightdrawer = payload
    },
  },
  modules: {
    auth,
    users,
  }
})
