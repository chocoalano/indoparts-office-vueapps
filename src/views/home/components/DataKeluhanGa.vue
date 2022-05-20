<template>
    <section>
        <v-toolbar flat color="rgba(0,0,0,0)">
            <v-divider vertical color="primary" inset></v-divider>
            <v-toolbar-title class="ml-4">Data Keluhan GA</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <keluhan-ga-table-components></keluhan-ga-table-components>
    </section>
</template>
<script>
import KeluhanGaTableComponents  from '@/components/table/KeluhanGaTableComponents .vue';
import { mapState, mapActions } from "vuex";
export default {
    components: {
        // eslint-disable-next-line vue/no-unused-components
        KeluhanGaTableComponents
    },
    computed: {
        ...mapState(["baseUrl"]),
        ...mapState("auth", {
            UserOnline: (state) => state.UserOnline,
        }),
        UserOnline: {
            get: function () {
                return this.$store.state.auth.UserOnline;
            },
            set: function (value) {
                this.$store.commit("auth/ASSIGN_USER_ONLINE", value);
            },
        },
    },
    mounted() {
        this.UserLoginList(),
        this.sockets.subscribe('auth:user', (data) => {
            if (data) {
                this.UserLoginList()
            }
        });
    },
    methods: {
        ...mapActions('auth', ['UserLoginList']),
    }
};
</script>
