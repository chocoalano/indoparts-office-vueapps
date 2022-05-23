<template>
    <div>
        <v-badge bordered color="primary" :content="notif_count" overlap class="mb-3">
            <v-btn class="changewith" @click="btnClick">
                <v-icon :class="[notif_count > 0 ? 'bell' : '']"
                    v-text="notif_count > 0 ? 'mdi-bell-ring' : 'mdi-bell'" />
            </v-btn>
        </v-badge>
    </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import SnackbarComponents from '@/components/SnackbarComponents';
export default {
    components: {
        SnackbarComponents
    },
    mounted() {
        this.Notification()
        this.sockets.subscribe('auth:user', (data) => {
            this.Notification().then(() => {
                let text = `${data.user.nama} online.`
                this.setSnackbar(true,true,'primary',text)
            })
        })
        this.sockets.subscribe('auth:keluhan-ga', (data) => {
            if (this.authenticated.role_id === data.notif_to_role_id) {
                this.Notification().then(() => {
                    this.setSnackbar(true,true,'primary',data.data)
                })
            }
        })
    },
    computed: {
        ...mapState(["notif", "notif_count"]),
        notif: {
            get: function () {
                return this.$store.state.notif;
            },
            set: function (value) {
                this.$store.commit("SET_NOTIF", value);
            },
        },
        notif_count: {
            get: function () {
                return this.$store.state.notif_count;
            },
            set: function (value) {
                this.$store.commit("SET_NOTIF_COUNT", value);
            },
        },
        ...mapState("auth", {
            authenticated: (state) => state.authenticated,
        }),
    },
    methods: {
        ...mapActions('auth', ['Notification']),
        setSnackbar(snackbar, vertical, color, text) {
            const data = {
                snackbar:snackbar,
                vertical:vertical,
                color:color,
                text:text,
            }
            this.$store.commit('SET_SNACKBAR', data, { root: true })
        },
        btnClick(){
            this.$router.push({ name: "notifikasi" });
        }
    },
};
</script>