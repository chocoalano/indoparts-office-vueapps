<template>
    <v-snackbar
      v-model="snackbarState.snackbar"
      :timeout="3000"
      :vertical="snackbarState.vertical"
      :color="snackbarState.color"
      elevation="24"
      right
      top
    >
      {{ snackbarState.text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbarState.snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>
<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState(["snackbarState"]),
        snackbarState: {
            get: function () {
                return this.$store.state.snackbarState;
            },
            set: function (value) {
                this.$store.commit("SET_SNACKBAR", value);
            },
        }
    }
}
</script>