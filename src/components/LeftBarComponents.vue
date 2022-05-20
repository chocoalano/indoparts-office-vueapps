<template>
  <v-navigation-drawer v-model="leftdrawer" app mini-variant mini-variant-width="110">
    <v-avatar class="d-block text-center mx-auto mt-4 mb-10" size="80">
      <v-btn class="ma-2" outlined large fab>
        <v-icon x-large>mdi-react</v-icon>
      </v-btn>
    </v-avatar>

    <v-card flat class="rounded-xl mx-4 py-10">
      <v-list flat>
        <v-list-item-group v-model="selectedItem">
          <v-list-item v-for="(item, i) in items" :key="i" active-class="border" v-slot="{ active }" :ripple="false"
            :to="item.link">
            <v-list-item-content>
              <v-icon v-text="item.icon" :color="active ? 'white' : 'grey lighten-1'"></v-icon>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
    <div style="
        position: absolute;
        bottom: 20px;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        text-align: center;
      ">
      <v-avatar size="40">
        <v-img :src="`${baseUrl}/api/images/avatar-users/${authenticated.avatar}`" class="image"></v-img>
      </v-avatar>
      <p v-text="socketConnected"></p>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    selectedItem: 0,
    items: [
      { icon: "mdi-home-outline", link: "/" },
      { icon: "mdi-apps", link: "/apps" },
    ],
  }),
  computed: {
    ...mapState(["baseUrl", "leftdrawer", "socketConnected", "socketMessage"]),
    leftdrawer: {
      get: function () {
        return this.$store.state.leftdrawer;
      },
      set: function (value) {
        this.$store.commit("SET_LEFTDRAWER", value);
      },
    },
    ...mapState("auth", {
      authenticated: (state) => state.authenticated,
    }),
  },
};
</script>

<style>
.border {
  margin: 0px 8px;
  background: #6f0dff;
  border-radius: 15px;
  text-decoration: none;
  width: 60px;
  height: 60px;
}

.v-list-item-group .v-list-item--active {
  color: white !important;
}

.v-list-item__content {
  padding: 20px 0 !important;
}

.image {
  border: 1px solid white;
}
</style>