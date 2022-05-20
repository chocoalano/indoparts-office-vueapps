<template>
    <v-container>
        <v-form>
            <v-text-field v-model="form.name" label="Name" outlined dense color="primary" autocomplete="false" />
            <v-checkbox v-model="form.permission" v-for="n in radioGroup" :key="n" :label="`${n}`" :value="n"></v-checkbox>
        </v-form>
    </v-container>
</template>
<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            radioGroup: ["create", "read", "update", "delete", "export", "import"]
        }
    },
    computed: {
        ...mapState("permission", {
            form: (state) => state.form,
        }),
    },
}
</script>