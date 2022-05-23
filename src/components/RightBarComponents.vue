<template>
  <v-navigation-drawer v-model="rightdrawer" app mini-variant mini-variant-width="110" right>
    <v-avatar class="d-block text-center mx-auto mt-4 mb-10" size="80">
      <v-btn class="ma-2" outlined large fab> SH </v-btn>
    </v-avatar>

    <div style="
        position: absolute;
        bottom: 20px;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        text-align: center;
      ">
      <notification-components />
      <br />
      <v-btn class="changewith" @click="signout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from "vuex";
import NotificationComponents from '@/components/NotificationComponents';
export default {
  components:{
    NotificationComponents
  },
  computed: {
    ...mapState(["rightdrawer", "notif"]),
    rightdrawer: {
      get: function () {
        return this.$store.state.rightdrawer;
      },
      set: function (value) {
        this.$store.commit("SET_RIGHTDRAWER", value);
      },
    },
    notif: {
      get: function () {
        return this.$store.state.notif;
      },
      set: function (value) {
        this.$store.commit("SET_NOTIF", value);
      },
    },
  },
  data: () => ({
    selectedItem: 0,
  }),
  methods: {
    ...mapActions('auth', ['logout']),
    signout() {
      this.logout().then((e) => {
        if (e === 200 || e === 401) {
          this.$router.push({ name: "auth" });
        }
      })
    }
  },
};
</script>

<style>
.v-btn:not(.v-btn--round).v-size--default.changewith {
  height: 45px !important;
  min-width: 30px !important;
  padding: 0 12px;
}

.top {
  margin-top: 150px;
}
</style>