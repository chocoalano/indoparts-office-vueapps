<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field label="NIK" outlined dense color="blue" autocomplete="false" class="mt-16" v-model="form.nik"
      :rules="[rules.required, rules.minnik]" prepend-inner-icon="mdi-key-chain" />
    <v-text-field label="Password" outlined dense color="blue" v-model="form.password"
      prepend-inner-icon="mdi-shield-key" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" counter @click:append="show1 = !show1" />
    <v-checkbox label="Ingat Saya" class="mt-n1" color="blue" v-model="remember_me" />
    <v-row class="mb-5">
      <alert-dense-components :isShow="alert.isShow" :type="alert.type" :msg="alert.msg" />
    </v-row>
    <v-btn :disabled="!valid" color="primary" dark block tile @click="submit">Submit</v-btn>
  </v-form>
</template>
<script>
import { mapActions } from 'vuex'
import AlertDenseComponents from '@/components/AlertDenseComponents';
export default {
  components: {
    AlertDenseComponents
  },
  data: () => ({
    valid: true,
    show1: false,
    form: {
      nik: '',
      password: '',
    },
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 6 || 'Min 6 characters',
      minnik: v => v.length >= 3 || 'Min 3 characters',
    },
    remember_me: false,
    alert: {
      isShow: false,
      type: 'error',
      msg: ''
    }
  }),

  methods: {
    ...mapActions('auth', ['submitLogin']),
    submit() {
      const validate = this.$refs.form.validate()
      if (validate) {
        this.submitLogin(this.form).then((res) => {
          if (res.status === 200 && this.remember_me === true) {
            localStorage.setItem('nik', this.form.nik)
          }
          this.alert.isShow = true
          this.alert.type = (res.status === 200) ? 'success' : 'error'
          this.alert.msg = (res.status === 200) ? 'Login berhasil' : 'Login gagal, Terjadi kesalahan.'
          setTimeout(() => (this.alert = {
            isShow: false,
            type: 'error',
            msg: ''
          }), 2000)
        })
      }
    },
  },
}
</script>