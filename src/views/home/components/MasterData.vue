<template>
    <section>
        <v-toolbar flat color="rgba(0,0,0,0)">
            <v-divider vertical color="primary" inset></v-divider>
            <v-toolbar-title class="ml-4">Menu Master Data</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn class="mr-2 withoutupercase d-none d-sm-flex">
                Lihat Semua
            </v-btn>
        </v-toolbar>
        <card-menu-components @callback="loadData" :md="cardMenuComponentsData.md" :sm="cardMenuComponentsData.sm"
            :data="cardMenuComponentsData.data" />
        <v-toolbar flat color="rgba(0,0,0,0) ">
            <v-divider vertical color="orange" inset></v-divider>
            <v-toolbar-title class="ml-4">Tabel Data</v-toolbar-title>
            <v-spacer></v-spacer>

        </v-toolbar>
        <user-table-components v-if="cardpick === 0"></user-table-components>
        <role-table-components v-if="cardpick === 1"></role-table-components>
        <dept-table-components v-if="cardpick === 2"></dept-table-components>
        <permission-table-components v-if="cardpick === 3"></permission-table-components>
        <role-permission-table-components v-if="cardpick === 4"></role-permission-table-components>
    </section>
</template>
<script>
import CardMenuComponents from '@/components/CardMenuComponents';
import UserTableComponents from '@/components/table/UserTableComponents';
import RoleTableComponents from '@/components/table/RoleTableComponents';
import DeptTableComponents from '@/components/table/DeptTableComponents';
import PermissionTableComponents from '@/components/table/PermissionTableComponents';
import RolePermissionTableComponents from '@/components/table/RolePermissionTableComponents';
export default {
    components: {
        CardMenuComponents,
        UserTableComponents,
        RoleTableComponents,
        DeptTableComponents,
        PermissionTableComponents,
        RolePermissionTableComponents,
    },
    data: () => ({
    cardpick: 0,
    cardMenuComponentsData: {
      md: 2,
      sm: 12,
      data: [
        {
          id: 0,
          icon: 'mdi-account-group',
          text: 'Data Karyawan',
          count: 50,
        },
        {
          id: 1,
          icon: 'mdi-database',
          text: 'Data Jabatan',
          count: 50,
        },
        {
          id: 2,
          icon: 'mdi-archive',
          text: 'Data Dept',
          count: 50,
        },
        {
          id: 3,
          icon: 'mdi-clipboard-file',
          text: 'Data Akses',
          count: 50,
        },
        {
          id: 4,
          icon: 'mdi-key',
          text: 'Data Akses Sistem',
          count: 50,
        }
      ]
    }
  }),
  methods: {
    loadData(e) {
      this.cardpick = e.act
    }
  }
};
</script>