<template>
    <v-container>
        <v-form>
            <v-select v-model="form.role_id" item-text="rolename" item-value="id" :items="data_jabatan" label="Jabatan"
                outlined dense color="primary"></v-select>
            <v-select v-model="form.dept_id" item-text="deptname" item-value="id" :items="data_departemen"
                label="Departemen" outlined dense color="primary"></v-select>
            <v-text-field v-model="form.name" label="NIK" outlined dense color="primary" autocomplete="false" />
            <v-text-field v-model="form.nik" label="Nama" outlined dense color="primary" autocomplete="false" />
            <v-text-field v-model="form.password" label="Password" outlined dense color="primary" autocomplete="false"
                prepend-inner-icon="mdi-shield-key" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'" counter @click:append="show1 = !show1" />
            <v-text-field v-model="form.password_confirmation" label="Konfirmasi Password" outlined dense
                color="primary" autocomplete="false" prepend-inner-icon="mdi-shield-key"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" counter
                @click:append="show2 = !show2" />
            <v-switch v-model="form.activation" label="Aktivasi"></v-switch>
            <v-file-input truncate-length="15" v-model="form.avatar"></v-file-input>
        </v-form>
    </v-container>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
    data: () => ({
        show1: false,
        show2: false,
        data_jabatan: [],
        data_departemen: []
    }),
    computed: {
        ...mapState("users", {
            form: (state) => state.form,
        }),
    },
    mounted() {
        this.getAttrFormRegister().then((res) => {
            if (res.status === 200) {
                this.data_departemen = res.data.departemen
                this.data_jabatan = res.data.jabatan
            }
        })
    },
    methods: {
        ...mapActions('auth', ['getAttrFormRegister']),
    },
}
</script>