<template>
  <v-app>
    <app-bar-components></app-bar-components>
    <v-container>
      <h1>APPS</h1>
      <p class="grey--text">
        Cara Hebat Untuk Menghasilkan Semua Kebutuhan yang Anda Butuhkan Untuk Menjadi Lebih Hebat
      </p>
      <v-divider></v-divider>
      <v-toolbar flat color="rgba(0,0,0,0)">
        <v-divider vertical color="primary" inset></v-divider>
        <v-toolbar-title class="ml-4">Menu Form</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="mr-2 withoutupercase d-none d-sm-flex">
          Lihat Semua
        </v-btn>
      </v-toolbar>
      <card-menu-components @callback="loadData" :md="cardMenuComponentsData.md" :sm="cardMenuComponentsData.sm"
        :data="cardMenuComponentsData.data" />
      <v-toolbar flat color="rgba(0,0,0,0) ">
        <v-divider vertical color="orange" inset></v-divider>
        <v-toolbar-title class="ml-4">Memudahkan anda melakukan proses administratif</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <alert-dense-components :isShow="alert.isShow" :type="alert.type" :msg="alert.msg"></alert-dense-components>
      <v-container>
        <v-card>
          <v-card-title>Form Keluhan GA</v-card-title>
          <v-card-text>
            <form-keluhan-general-affair-components v-if="cardpick === 2" />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="submit()">submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-container>
  </v-app>
</template>

<script>
import AppBarComponents from '@/components/AppBarComponents';
import CardMenuComponents from '@/components/CardMenuComponents';
import FormKeluhanGeneralAffairComponents from '@/components/form/FormKeluhanGeneralAffairComponents.vue';
import AlertDenseComponents from '@/components/AlertDenseComponents';
import { mapActions } from 'vuex';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  data: () => ({
    alert: {
      isShow: false,
      type: '',
      msg: '',
    },
    cardpick: 0,
    cardMenuComponentsData: {
      md: 2,
      sm: 12,
      data: [
        {
          id: 0,
          icon: 'mdi-account-group',
          text: 'FORM CUTI',
          count: 50,
        },
        {
          id: 1,
          icon: 'mdi-face-agent',
          text: 'FORM IZIN',
          count: 50,
        },
        {
          id: 2,
          icon: 'mdi-office-building-outline',
          text: 'FORM GA',
          count: 50,
        },
        {
          id: 3,
          icon: 'mdi-clipboard-file',
          text: 'FORM HR',
          count: 50,
        },
        {
          id: 4,
          icon: 'mdi-clipboard-file-outline',
          text: 'FORM LAINYA',
          count: 50,
        }
      ]
    }
  }),
  components: {
    CardMenuComponents,
    AppBarComponents,
    // eslint-disable-next-line vue/no-unused-components
    FormKeluhanGeneralAffairComponents,
    AlertDenseComponents
  },
  methods: {
    ...mapActions('keluhan_ga', ['storeGA']),
    loadData(e) {
      this.cardpick = e['act']
    },
    submit() {
      let e = parseInt(this.cardpick)
      switch (e) {
        case 0:
          console.log('submit form izin');
          break;
        case 1:
          console.log('submit form HR');
          break;
        case 2:
          this.storeGA().then((res) => {
            if (res.status === 200) {
              this.setAlert(true, 'success', 'Data disampaikan.')
              setTimeout(() => (
                this.setAlert(false, '', '')
              ), 4000)
            }
          })
          break;
        case 3:
          console.log('submit form LAINYA');
          break;

        default:
          console.log('nothing!');
          break;
      }
    },
    setAlert(isShow, type, msg) {
      this.alert = {
        isShow: isShow,
        type: type,
        msg: msg,
      }
    }
  }
}
</script>