import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import users from './modules/users'
import roles from './modules/roles'
import depts from './modules/depts'
import permission from './modules/permission'
import rolepermission from './modules/rolepermission'
import keluhan_ga from './modules/keluhan_ga'
import notification from './modules/notification'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    baseUrl: 'http://localhost:3333',
    token_expired: localStorage.getItem('expires_at'),
    isMobile: false,
    leftdrawer: true,
    rightdrawer: true,
    socketConnected: false,
    socketMessage: [],
    notif: false,
    notif_count: 0,
    notif_data: [],
    snackbarState: {
      snackbar: false,
      vertical: true,
      color: '',
      text: '',
    }
  },
  getters: {
    isAuth: state => {
      return state.token != "null" && state.token != null
    }
  },
  mutations: {
    SET_SOCKET_CONNECT(state, payload) {
      state.socketConnected = payload
    },
    SET_SOCKET_MSG(state, payload) {
      state.socketMessage = payload
    },
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
    SET_NOTIF(state, payload) {
      state.notif = payload
    },
    SET_NOTIF_COUNT(state, payload) {
      state.notif_count = payload
    },
    SET_NOTIF_DATA(state, payload) {
      state.notif_data = payload
    },
    SET_SNACKBAR(state, payload) {
      state.snackbarState = {
        snackbar: payload.snackbar,
        vertical: payload.vertical,
        color: payload.color,
        text: payload.text
      }
    },
  },
  modules: {
    auth,
    users,
    roles,
    depts,
    permission,
    rolepermission,
    keluhan_ga,
    notification,
  }
})
