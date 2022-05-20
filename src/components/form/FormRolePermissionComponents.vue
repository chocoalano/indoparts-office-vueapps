<template>
    <v-container>
        <v-form>
            <v-select v-model="form.role_id" item-text="rolename" item-value="id" :items="jabatan" label="Jabatan"
                outlined dense color="primary" @change="changed(form.role_id)"></v-select>
            <v-checkbox v-model="form.permission_id" v-for="n in akses" :key="n.id" :label="`${n.name} / ${n.basepermission}`" :value="n.id"></v-checkbox>
        </v-form>
    </v-container>
</template>
<script>
import { mapState,mapActions } from "vuex";
export default {
    data() {
        return {
            jabatan: [],
            akses: []
        }
    },
    computed: {
        ...mapState("rolepermission", {
            form: (state) => state.form,
        }),
    },
    mounted() {
        this.form_attr().then((res) => {
            if (res.status === 200) {
                this.jabatan = res.data.jabatan
                this.akses = res.data.akses
            }
        })
    },
    methods: {
        ...mapActions('rolepermission', ['form_attr','edit']),
        changed(e){
            this.$store.commit("rolepermission/SET_INDEX", e);
            this.edit()
        }
    },
}
</script>