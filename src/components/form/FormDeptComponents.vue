<template>
    <v-container>
        <v-form>
            <v-text-field v-model="form.deptname" label="Role name" outlined dense color="primary" autocomplete="false" />
        </v-form>
    </v-container>
</template>
<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState("depts", {
            form: (state) => state.form,
        }),
    },
}
</script>