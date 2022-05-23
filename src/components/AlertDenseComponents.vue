<template>
    <v-alert v-if="show" dense :type=type>
        {{ msg }} <strong v-text="type" />
    </v-alert>
</template>
<script>
export default {
    data:()=>({
        show:false
    }),
    props: {
        isShow: Boolean,
        type: String,
        msg: String,
    },
    watch: { 
      	isShow: function(val) { // watch it
          this.show = val
        }
      }
}
</script>