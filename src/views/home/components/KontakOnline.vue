<template>
    <section>
        <v-toolbar flat color="rgba(0,0,0,0)">
            <v-divider vertical color="primary" inset></v-divider>
            <v-toolbar-title class="ml-4">Menu Kontak Online</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn class="mr-2 withoutupercase d-none d-sm-flex">
                Lihat Daftar Semua Karyawan
            </v-btn>
        </v-toolbar>
        <v-row class="mt-n14">
            <v-col cols="12" xs="12" sm="6" md="4" lg="3" v-for="(data, i) in UserOnline" :key="i">
                <v-card class="mx-auto my-12" max-width="374">
                    <v-img height="170" lazy-src="https://picsum.photos/id/11/10/6"
                        src="https://picsum.photos/id/11/500/300"></v-img>
                    <v-toolbar color="transparent" class="mt-n7" flat>
                        <v-avatar color="white" rounded class="mr-2" size="100">
                            <v-img lazy-src="https://picsum.photos/id/11/10/6"
                                :src="`${baseUrl}/api/images/avatar-users/${data.user_online.avatar}`" contain></v-img>
                        </v-avatar>
                        <v-spacer></v-spacer>
                        <v-chip class="ma-2" color="green" text-color="white">
                            Is Online
                        </v-chip>
                    </v-toolbar>
                    <v-card-title class="caption mt-5">{{
                            data.user_online.name
                    }}</v-card-title>
                    <v-card-title class="caption mt-n6">{{
                            data.user_online.nik
                    }}</v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </section>
</template>
<script>
// import Name from '@/components/Name.vue';
import { mapState, mapActions } from "vuex";
export default {
    // components: {
    //     Name
    // },
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
