<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-select v-model="form.role_id" :rules="[rules.required]" item-text="rolename" item-value="id"
      :items="data_jabatan" label="Jabatan" outlined dense color="primary"></v-select>
    <v-select v-model="form.dept_id" :rules="[rules.required]" item-text="deptname" item-value="id"
      :items="data_departemen" label="Departemen" outlined dense color="primary"></v-select>
    <v-text-field v-model="form.name" :rules="[rules.required]" label="NIK" outlined dense color="primary"
      autocomplete="false" />
    <v-text-field v-model="form.nik" :rules="[rules.required]" label="Nama" outlined dense color="primary"
      autocomplete="false" />
    <v-text-field v-model="form.password" label="Password" outlined dense color="primary" autocomplete="false"
      prepend-inner-icon="mdi-shield-key" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" counter @click:append="show1 = !show1" />
    <v-text-field v-model="form.password_confirmation" label="Konfirmasi Password" outlined dense color="primary"
      autocomplete="false" prepend-inner-icon="mdi-shield-key" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" counter @click:append="show2 = !show2" />
    <v-row>
      <v-col cols="12" md="7" sm="12">
        <v-checkbox v-model="agree" label="Saya menyetujui" class="mt-n1" color="primary"> </v-checkbox>
      </v-col>
      <v-col cols="12" md="5" sm="12">
        <span class="caption primary--text" :class="[isMobile ? false : 'ml-n4', '']">Syarat & ketentuan</span>
      </v-col>
    </v-row>
    <v-row class="mb-5">
      <alert-dense-components :isShow="alert.isShow" :type="alert.type" :msg="alert.msg" />
    </v-row>
    <v-btn :disabled="!valid" @click="submit" color="primary" dark block tile>Submit</v-btn>
  </v-form>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import AlertDenseComponents from '@/components/AlertDenseComponents';
export default {
  components: {
    AlertDenseComponents
  },
  data: () => ({
    valid: true,
    show1: false,
    show2: false,

    data_jabatan: [],
    data_departemen: [],

    form: {
      role_id: '',
      dept_id: '',
      name: '',
      nik: '',
      password: '',
      password_confirmation: '',
    },
    agree: false,
    rules: {
      required: v => !!v || 'wajib diisi.',
      min: v => v.length >= 6 || 'Minimal 6 karakter',
      minnik: v => v.length >= 4 || 'Minimal 4 karakter',
    },
    alert: {
      isShow: false,
      type: 'error',
      msg: ''
    }
  }),

  computed: {
    ...mapState(['isMobile']),
  },

  methods: {
    ...mapActions('auth', ['getAttrFormRegister', 'submitRegister']),
    submit() {
      const validate = this.$refs.form.validate()
      if (validate) {
        if (this.agree) {
          this.submitRegister(this.form).then((res) => {
            this.alert.isShow = true
            this.alert.type = (res.status === 200) ? 'success' : 'error'
            this.alert.msg = (res.status === 200) ? 'Pendaftaran berhasil' : 'Pendaftaran gagal, Terjadi kesalahan.'
            setTimeout(() => (this.alert = {
              isShow: false,
              type: 'error',
              msg: ''
            }), 2000)
          })
        } else {
          this.alert.isShow = true
          this.alert.type = 'error'
          this.alert.msg = 'Data tidak akan dikirim hingga anda menyetujui syarat & ketentuan pada sistem!'
          setTimeout(() => (this.alert = {
            isShow: false,
            type: 'error',
            msg: ''
          }), 2000)
        }
      }
    },
  },

  mounted() {
    this.getAttrFormRegister().then((res) => {
      if (res.status === 200) {
        this.data_departemen = res.data.departemen
        this.data_jabatan = res.data.jabatan
      }
    })
  },
}
</script>