<template>
  <v-app>
    <snackbar-components :snackbar="snackbar.display" :vertical="snackbar.vertical" :text="snackbar.text">
    </snackbar-components>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SnackbarComponents from '@/components/SnackbarComponents.vue'
export default {
  name: 'App',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    SnackbarComponents
  },
  data: () => ({
    snackbar: {
      display: false,
      vertical: true,
      text: '',
    },
  }),
  computed: {
    ...mapGetters(['isAuth'])
  },
  watch: {
    isAuth(nv) {
      if (nv) {
        this.getUserLogin().then((res) => {
          if (res.status != 200) {
            localStorage.setItem('token', null)
            this.$store.commit('SET_TOKEN', null, { root: true })
            this.$router.push({ name: "auth" });
          } else {
            this.$router.push({ name: "home" });
          }
        })
      }
    }
  },
  mounted() {
    if (this.isAuth) {
      this.getUserLogin().then((res) => {
        if (res.status != 200) {
          localStorage.setItem('token', null)
          this.$store.commit('SET_TOKEN', null, { root: true })
        }
      })
    }
    this.sockets.subscribe('auth:user', (data) => {
      this.snackbar.display = true
      this.snackbar.text = `User atas nama ${data.user.name} ${data.state === 'islogin' ? 'Online' : 'Offline'}`
      setTimeout(() => {
        this.snackbar.display = false
        this.snackbar.text = ''
      }, 3000)
    })
  },
  methods: {
    ...mapActions('auth', ['getUserLogin'])
  },
};
</script>
