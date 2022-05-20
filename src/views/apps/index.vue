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
      <form-keluhan-general-affair-components v-if="cardpick === 2"></form-keluhan-general-affair-components>
    </v-container>
  </v-app>
</template>

<script>
import AppBarComponents from '@/components/AppBarComponents';
import CardMenuComponents from '@/components/CardMenuComponents';
import FormKeluhanGeneralAffairComponents from '@/components/form/FormKeluhanGeneralAffairComponents.vue';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  data: () => ({
    cardpick:0,
    selection: 1,
    leftdrawer: true,
    rightdrawer: true,
    cardMenuComponentsData: {
      md: 2,
      sm: 12,
      data: [
        {
          id:0,
          icon: 'mdi-account-group',
          text: 'FORM CUTI',
          count: 50,
        },
        {
          id:1,
          icon: 'mdi-face-agent',
          text: 'FORM IZIN',
          count: 50,
        },
        {
          id:2,
          icon: 'mdi-office-building-outline',
          text: 'FORM GA',
          count: 50,
        },
        {
          id:3,
          icon: 'mdi-clipboard-file',
          text: 'FORM HR',
          count: 50,
        },
        {
          id:4,
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
  },
  methods:{
    loadData(e) {
      this.cardpick = e['act']
    }
  }
};
</script>
<style scoped>
.v-tab.withoutupercase {
  text-transform: none !important;
}

.v-tabs {
  width: 50% !important;
}

.v-btn.withoutupercase {
  text-transform: none !important;
}

.three {
  width: 50px;
  height: 50px;
}

.four {
  width: 50px;
  height: 25px;
  background: black;
}

.five {
  width: 50px;
  height: 25px;
  background: #042a0f;
}

.six {
  width: 50px;
  height: 25px;
  background: #2c2107;
}
</style>