<template>
  <v-app>
    <app-bar-components></app-bar-components>
    <v-container>
      <h1>BERANDA</h1>
      <p class="grey--text">
        Cara Hebat Untuk Menghasilkan Semua Kebutuhan yang Anda Butuhkan Untuk Menjadi Lebih Hebat
      </p>
      <v-app-bar flat>
        <v-tabs color="primary" v-model="tab">
          <v-tabs-slider color="primary"></v-tabs-slider>
          <v-tab v-text="'Master Data'" v-if="$can('read-user')||$can('read-role')||$can('read-dept')||$can('read-permission')||$can('read-keluhan-ga')" />
          <v-tab v-text="'User Online'" />
          <v-tab v-text="'Keluhan GA'" v-if="$can('read-keluhan-ga')" />
        </v-tabs>
      </v-app-bar>
      <v-divider></v-divider>
      <master-data v-if="tab === null||tab === 0"></master-data>
      <kontak-online v-if="tab != null && tab === 1"></kontak-online>
      <data-keluhan-ga v-if="tab != null && tab === 2"></data-keluhan-ga>
    </v-container>
  </v-app>
</template>

<script>
import AppBarComponents from '@/components/AppBarComponents';
import MasterData from './components/MasterData';
import KontakOnline from './components/KontakOnline';
import DataKeluhanGa from './components/DataKeluhanGa';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  data: () => ({
    tab: null,
    leftdrawer: true,
    rightdrawer: true,
  }),
  components: {
    AppBarComponents,
    MasterData,
    // eslint-disable-next-line vue/no-unused-components
    KontakOnline,
    // eslint-disable-next-line vue/no-unused-components
    DataKeluhanGa
  }
};
</script>