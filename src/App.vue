<template>
  <v-app>
    <snackbar-components />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import SnackbarComponents from '@/components/SnackbarComponents';
export default {
  name: 'App',
  components:{
    SnackbarComponents
  },
  computed: {
    ...mapGetters(['isAuth']),
    ...mapState(["token_expired"]),
    ...mapState("auth", {
      authenticated: (state) => state.authenticated,
      permissions: (state) => state.permissions,
    }),
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
    },
    snackbarState(nv){
      console.log(nv);
    }
  },
  mounted() {
    const dateNow = new Date()
    const dateExp = new Date(this.token_expired)
    if (dateNow.getTime() > dateExp.getTime()) {
      alert('session time out!')
      localStorage.setItem('token', null)
      this.$store.commit('SET_TOKEN', null, { root: true })
      this.$router.push({ name: "auth" });
    }
    if (this.isAuth) {
      this.getUserLogin().then((res) => {
        if (res.status != 200) {
          localStorage.setItem('token', null)
          this.$store.commit('SET_TOKEN', null, { root: true })
        }
      })
    }
  },
  methods: {
    ...mapActions('auth', ['getUserLogin'])
  },
};
</script>
