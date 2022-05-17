<template>
    <v-snackbar
      :timeout="-1"
      v-model="snackbar"
      :vertical="vertical"
      left
      shaped
      top
    >
      {{ text }}
    </v-snackbar>
</template>
<script>
export default {
    props: {
        snackbar: Boolean,
        vertical: Boolean,
        text: String,
    }
}
</script>