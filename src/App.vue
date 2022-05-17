<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
export default {
  name: 'App',
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
          }else{
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
  },
  methods: {
    ...mapActions('auth', ['getUserLogin'])
  },
};
</script>
