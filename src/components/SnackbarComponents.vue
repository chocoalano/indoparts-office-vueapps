<template>
    <v-snackbar
      v-model="snackbar"
      :vertical="vertical"
      color="deep-purple accent-4"
      elevation="24"
      right
      top
    >
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
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