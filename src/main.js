import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import vuetify from './plugins/vuetify'
import "./assets/styles.scss";
import { mapActions, mapState } from 'vuex'

Vue.config.productionTip = false

const SocketInstance = socketio.connect('http://localhost:3333');
Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketInstance
}))

new Vue({
  router,
  store,
  vuetify,

  sockets: {
    connect() {
      this.$store.commit('SET_SOCKET_CONNECT', true)
    },
    disconnect() {
      this.$store.commit('SET_SOCKET_CONNECT', false)
    },
    messageChannel(data) {
      this.$store.commit('SET_SOCKET_MSG', data)
    }
  },
  beforeDestroy() {
    if (typeof window === 'undefined') return
    window.removeEventListener('resize', this.onResize, { passive: true })
  },
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
    this.sockets.subscribe('news', (data) => {
      this.$store.commit('SET_SOCKET_MSG', data)
    });
  },
  computed: {
    ...mapState(['isMobile', 'baseUrl']),
    isMobile: {
      get: function () {
        return this.$store.state.isMobile;
      },
      set: function (value) {
        this.$store.commit("SET_ISMOBILE", value);
      },
    },
  },
  methods: {
    ...mapActions('auth', ['getUserLogin']),
    onResize() {
      this.isMobile = window.innerWidth < 600
    },
  },
  render: h => h(App)
}).$mount('#app')
