<template>
    <v-data-table :headers="headers" :items="desserts" :options.sync="options" :server-items-length="totalDesserts"
        :loading="loading" sort-by="calories" class="elevation-1" v-model="selected" item-key="id" show-select>
        <template v-slot:top>
            <v-toolbar flat>
                <snackbar-components :snackbar="snackbar.snackbar" :vertical="snackbar.vertical" :text="snackbar.text">
                </snackbar-components>
                <v-toolbar-title>My CRUD</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-switch v-model="singleSelect" class="pa-3"></v-switch>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                            New Item
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <form-users-components></form-users-components>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">
                                Cancel
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="save">
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:[`item.avatar`]="{ item }">
            <v-avatar size="40">
                <v-img :src="`${baseUrl}/api/images/avatar-users/${item.avatar}`" class="image"></v-img>
            </v-avatar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item.id)">
                mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item.id)">
                mdi-delete
            </v-icon>
        </template>
    </v-data-table>
</template>

<script>
import { mapActions,mapState } from "vuex";
import FormUsersComponents from '@/components/FormUsersComponents';
import SnackbarComponents from '@/components/SnackbarComponents';
export default {
    components: {
        FormUsersComponents,
        SnackbarComponents
    },
    data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
            { text: 'Jabatan', value: 'roles.rolename' },
            { text: 'Departemen', value: 'dept.deptname' },
            { text: 'NIK', value: 'nik' },
            { text: 'Nama', value: 'name' },
            { text: 'Aktivasi', value: 'activation' },
            { text: 'Avatar', value: 'avatar' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        singleSelect: false,
        selected: [],
        totalDesserts: 0,
        desserts: [],
        loading: true,
        options: {},
        editedIndex: -1,
        snackbar: {
            snackbar: false,
            vertical: true,
            text: '',
        }
    }),

    computed: {
        ...mapState(["baseUrl"]),
        formTitle() {
            return this.editedIndex === -1 ? 'New Data' : 'Edit Data'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
        options: {
            handler() {
                this.getDataFromApi()
            },
            deep: true,
        },
    },

    methods: {
        ...mapActions('users', ['index', 'store', 'edit']),
        getDataFromApi() {
            this.loading = true
            this.index().then(data => {
                console.log(data.data.data);
                this.desserts = data.data.data
                this.totalDesserts = data.data.total
                this.loading = false
            })
        },

        editItem(item) {
            this.editedIndex = parseInt(item)
            this.edit(item).then((res)=>{
                if (res.status === 200) {
                    this.dialog = true
                }
            })
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.desserts.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                console.log('update');
            } else {
                console.log('insert');
                this.store().then((res) => {
                    if (res.status === 200) {
                        this.snackbar = {
                            snackbar: false,
                            vertical: true,
                            text: `${res.data} Data berhasil ditambahkan`,
                        }
                    } else {
                        this.snackbar = {
                            snackbar: false,
                            vertical: true,
                            text: `${res.data} Data gagal ditambahkan!`,
                        }
                    }
                })
            }
            this.close()
        },
    },
}
</script>