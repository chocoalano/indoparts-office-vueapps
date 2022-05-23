<template>
    <section>
        <v-row>
            <v-col cols="12" md="4" sm="12">
                <v-select v-model="form.user_id" :items="itemsUsers" item-text="name" item-value="id"
                    :rules="[v => !!v || 'Nama harus diisi!']" label="Nama" disabled required />
            </v-col>
            <v-col cols="12" md="4" sm="12">
                <v-select v-model="form.role_id" :items="itemsJabatan" item-text="rolename" item-value="id"
                    :rules="[v => !!v || 'Jabatan harus diisi!']" label="Jabatan" disabled required />
            </v-col>
            <v-col cols="12" md="4" sm="12">
                <v-select v-model="form.dept_id" :items="itemsDept" item-text="deptname" item-value="id"
                    :rules="[v => !!v || 'Departemen harus diisi!']" label="Departemen" disabled required />
            </v-col>
        </v-row>
        <v-textarea v-model="form.notes" label="Keterangan" :rules="[v => !!v || 'Keterangan harus diisi!']" />
        <v-file-input v-model="form.image" accept="image/png, image/jpeg, image/bmp" placeholder="Pick an avatar"
            prepend-icon="mdi-camera" label="Foto"></v-file-input>
        <v-checkbox v-model="form.agree"
            :rules="[v => !!v || 'Anda wajib bertanggung jawab dengan apa yang disampaikan!']"
            label="Saya bertanggung jawab penuh atas apa yang saya sampaikan, Apakah kamu setuju?" required />
    </section>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
    data: () => ({
        itemsUsers:[],
itemsJabatan:[],
itemsDept:[],
    }),
    computed: {
        ...mapState("auth", {
            authenticated: (state) => state.authenticated,
        }),
        ...mapState("keluhan_ga", {
            form: (state) => state.form,
        }),
        form: {
            get: function () {
                return this.$store.state.keluhan_ga.form;
            },
            set: function (value) {
                this.$store.commit("keluhan_ga/SET_FORM", value);
            },
        },
    },
    mounted() {
        this.getAttrFormRegister().then((res) => {
            if (res.status === 200) {
                this.itemsUsers = res.data.user
                this.itemsJabatan = res.data.jabatan
                this.itemsDept = res.data.departemen
                this.form = {
                    user_id: parseInt(this.authenticated.id),
                    role_id: parseInt(this.authenticated.role_id),
                    dept_id: parseInt(this.authenticated.dept_id),
                    responsibility: false,
                    desc: '',
                    picture: [],
                }
            }
        })
    },
    methods: {
        ...mapActions('auth', ['getAttrFormRegister']),
    },
}
</script>
