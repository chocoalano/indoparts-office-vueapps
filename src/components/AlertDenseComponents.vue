<template>
    <v-alert v-if="isShow" dense :type=type>
        {{ msg }} <strong v-text="type" />
    </v-alert>
</template>
<script>
export default {
    props: {
        isShow: Boolean,
        type: String,
        msg: String,
    }
}
</script>