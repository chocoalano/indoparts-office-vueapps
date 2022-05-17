import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import "./assets/styles.scss";
import { mapActions,mapState } from 'vuex'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  beforeDestroy () {
    if (typeof window === 'undefined') return
    window.removeEventListener('resize', this.onResize, { passive: true })
  },
  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  computed: {
    ...mapState(['isMobile']),
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
    onResize () {
      this.isMobile = window.innerWidth < 600
    },
  },
  render: h => h(App)
}).$mount('#app')
