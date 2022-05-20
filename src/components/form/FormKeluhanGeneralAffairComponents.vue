<template>
    <section>
        <v-container>
            <v-card>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-card-title>Form Keluhan General Affair</v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" md="4" sm="12">
                                <v-select v-model="form.user_id" :items="itemsUsers" item-text="name" item-value="id" 
                                    :rules="[v => !!v || 'Nama harus diisi!']" label="Nama" disabled required />
                            </v-col>
                            <v-col cols="12" md="4" sm="12">
                                <v-select v-model="form.role_id" :items="itemsJabatan" item-text="rolename"
                                    item-value="id" :rules="[v => !!v || 'Jabatan harus diisi!']" label="Jabatan"
                                    disabled required />
                            </v-col>
                            <v-col cols="12" md="4" sm="12">
                                <v-select v-model="form.dept_id" :items="itemsDept" item-text="deptname" item-value="id"
                                    :rules="[v => !!v || 'Departemen harus diisi!']" label="Departemen" disabled required />
                            </v-col>
                        </v-row>
                        <v-textarea v-model="form.desc" label="Keterangan"
                            :rules="[v => !!v || 'Keterangan harus diisi!']" />
                        <v-file-input v-model="form.picture" accept="image/png, image/jpeg, image/bmp"
                            placeholder="Pick an avatar" prepend-icon="mdi-camera" label="Avatar"></v-file-input>
                        <v-checkbox v-model="form.responsibility"
                            :rules="[v => !!v || 'Anda wajib bertanggung jawab dengan apa yang disampaikan!']"
                            label="Saya bertanggung jawab penuh atas apa yang saya sampaikan, Apakah kamu setuju?"
                            required />
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
                            Submit
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-container>
        {{ form }}
    </section>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
    data: () => ({
        valid: true,
        form: {
            user_id: '',
            role_id: '',
            dept_id: '',
            responsibility: false,
            desc: '',
            picture: [],
        },
        itemsUsers: [],
        itemsJabatan: [],
        itemsDept: [],
    }),
    computed: {
        ...mapState("auth", {
            authenticated: (state) => state.authenticated,
        }),
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
        validate() {
            this.$refs.form.validate()
        },
        reset() {
            this.$refs.form.reset()
        },
        resetValidation() {
            this.$refs.form.resetValidation()
        },
    },
}
</script>
