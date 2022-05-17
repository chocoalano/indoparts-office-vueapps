<template>
  <v-app>
    <app-bar-components></app-bar-components>
    <v-container>
      <h1>SALES</h1>
      <p class="grey--text">
        A Great Way To Generate All The Motivation You Need To Get Fit
      </p>
      <v-app-bar flat>
        <v-tabs color="primary">
          <v-tabs-slider color="primary"></v-tabs-slider>
          <v-tab class="withoutupercase">Master Data</v-tab>
          <v-tab class="withoutupercase">Kontak</v-tab>
          <v-tab class="withoutupercase">Surat-surat</v-tab>
          <v-tab class="withoutupercase">Daftar Aset</v-tab>
        </v-tabs>
        <v-spacer></v-spacer>
        <v-btn text class="d-none d-sm-flex">
          <v-icon left>mdi-magnify</v-icon>
          SEARCH
        </v-btn>
        <v-btn rounded color="primary" class="white--text">
          List
          <v-icon right>mdi-format-list-bulleted</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-apps</v-icon>
        </v-btn>
      </v-app-bar>
      <v-divider></v-divider>
      <v-toolbar flat color="rgba(0,0,0,0)">
        <v-divider vertical color="primary" inset></v-divider>
        <v-toolbar-title class="ml-4">Menu Data</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="mr-2 withoutupercase d-none d-sm-flex">
          See All (10)
        </v-btn>
        <v-btn class="mr-2" outlined>
          <v-icon left>mdi-chevron-left</v-icon>
          <v-icon right>mdi-chevron-right</v-icon>
        </v-btn>
      </v-toolbar>
      <card-menu-components :md="cardMenuComponentsData.md" :sm="cardMenuComponentsData.sm"
        :data="cardMenuComponentsData.data" />
      <v-toolbar flat color="rgba(0,0,0,0) ">
        <v-divider vertical color="orange" inset></v-divider>
        <v-toolbar-title class="ml-4">Tabel Data</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      </v-toolbar>
      <user-table-components></user-table-components>
    </v-container>
  </v-app>
</template>

<script>
import AppBarComponents from '@/components/AppBarComponents';
import CardMenuComponents from '@/components/CardMenuComponents';
import UserTableComponents from '@/components/UserTableComponents';
export default {
  name: "Home",
  data: () => ({
    search:'',
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
          text: 'Data Master Karyawan',
          count: 50,
        },
        {
          id:1,
          icon: 'mdi-database',
          text: 'Data Master Jabatan',
          count: 50,
        },
        {
          id:2,
          icon: 'mdi-archive',
          text: 'Data Master Dept',
          count: 50,
        },
        {
          id:3,
          icon: 'mdi-clipboard-file',
          text: 'Data Master Cuti',
          count: 50,
        },
        {
          id:4,
          icon: 'mdi-file-chart',
          text: 'Data Master Absensi',
          count: 50,
        },
        {
          id:5,
          icon: 'mdi-file-cabinet',
          text: 'Data Master Aset',
          count: 50,
        },
      ]
    }
  }),
  components: {
    CardMenuComponents,
    AppBarComponents,
    UserTableComponents
  },
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