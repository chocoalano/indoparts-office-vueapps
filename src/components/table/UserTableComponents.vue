<template>
    <v-data-table v-if="$can('read-user')" :headers="headers" :items="desserts" :options.sync="options" :server-items-length="totalDesserts"
        :loading="loading" sort-by="calories" class="elevation-1" v-model="selected" item-key="id" show-select>
        <template v-slot:top>
            <v-toolbar flat>
                <snackbar-components :snackbar="snackbar.snackbar" :vertical="snackbar.vertical" :text="snackbar.text">
                </snackbar-components>
                <v-toolbar-title>Master Data Karyawan</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-switch v-model="singleSelect" class="mt-7"></v-switch>
                <v-btn small outlined fab color="danger" @click="deletebatch" v-if="$can('delete-user')">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" prepend-icon="mdi-magnify" label="Cari berdasarkan nama" single-line hide-details>
                </v-text-field>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn small outlined fab color="primary" class="mb-2" v-bind="attrs" v-on="on" v-if="$can('create-user')">
                            <v-icon>mdi-plus</v-icon>
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
                <v-dialog v-model="dialogDelete" max-width="500px" v-if="$can('delete-user')">
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
            <v-icon small class="mr-2" @click="editItem(item.id)" v-if="$can('update-user')">
                mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item.id)" v-if="$can('delete-user')">
                mdi-delete
            </v-icon>
        </template>
    </v-data-table>
</template>

<script>
import { mapActions, mapState } from "vuex";
import FormUsersComponents from '@/components/form/FormUsersComponents';
import SnackbarComponents from '@/components/SnackbarComponents';
export default {
    components: {
        FormUsersComponents,
        SnackbarComponents
    },

    computed: {
        ...mapState(["baseUrl"]),
        formTitle() {
            return this.editedIndex === -1 ? 'New Data' : 'Edit Data'
        },
        ...mapState("users", {
            search: (state) => state.search,
            dialog: (state) => state.dialog,
            dialogDelete: (state) => state.dialogDelete,
            headers: (state) => state.headers,
            singleSelect: (state) => state.singleSelect,
            selected: (state) => state.selected,
            totalDesserts: (state) => state.totalDesserts,
            desserts: (state) => state.desserts,
            loading: (state) => state.loading,
            options: (state) => state.options,
            editedIndex: (state) => state.editedIndex,
            snackbar: (state) => state.snackbar,
        }),
        search: {
            get: function () {
                return this.$store.state.users.search;
            },
            set: function (value) {
                this.$store.commit("users/SET_SEARCH", value);
            },
        },
        dialog: {
            get: function () {
                return this.$store.state.users.dialog;
            },
            set: function (value) {
                this.$store.commit("users/SET_DIALOG", value);
            },
        },
        dialogDelete: {
            get: function () {
                return this.$store.state.users.dialogDelete;
            },
            set: function (value) {
                this.$store.commit("users/SET_DIALOG_DELETE", value);
            },
        },
        singleSelect: {
            get: function () {
                return this.$store.state.users.singleSelect;
            },
            set: function (value) {
                this.$store.commit("users/SET_SINGLESELECT", value);
            },
        },
        selected: {
            get: function () {
                return this.$store.state.users.selected;
            },
            set: function (value) {
                this.$store.commit("users/SET_SELECTED", value);
            },
        },
        totalDesserts: {
            get: function () {
                return this.$store.state.users.totalDesserts;
            },
            set: function (value) {
                this.$store.commit("users/SET_TOTALDESSERTS", value);
            },
        },
        desserts: {
            get: function () {
                return this.$store.state.users.desserts;
            },
            set: function (value) {
                this.$store.commit("users/SET_DESSERT", value);
            },
        },
        loading: {
            get: function () {
                return this.$store.state.users.loading;
            },
            set: function (value) {
                this.$store.commit("users/SET_LOADING", value);
            },
        },
        options: {
            get: function () {
                return this.$store.state.users.options;
            },
            set: function (value) {
                this.$store.commit("users/SET_OPTIONS", value);
            },
        },
        editedIndex: {
            get: function () {
                return this.$store.state.users.editedIndex;
            },
            set: function (value) {
                this.$store.commit("users/SET_INDEX", value);
            },
        },
        snackbar: {
            get: function () {
                return this.$store.state.users.snackbar;
            },
            set: function (value) {
                this.$store.commit("users/SET_SNACKBAR", value);
            },
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
        search(){
            this.getDataFromApi()
        },
        options: {
            handler() {
                this.getDataFromApi()
            },
            deep: true,
        },
    },

    methods: {
        ...mapActions('users', ['index', 'store', 'edit', 'update', 'destroy']),
        getDataFromApi() {
            this.index(this.options)
        },

        editItem(item) {
            this.$store.commit("users/SET_INDEX", parseInt(item));
            this.edit().then((res) => {
                if (res.status === 200) {
                    this.$store.commit("users/SET_DIALOG", true);
                }
            })
        },

        deleteItem(item) {
            this.$store.commit("users/SET_INDEX", parseInt(item));
            this.dialogDelete = true
        },
        deletebatch() {
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            const dellact = this.selected.length > 1 ? true : false
            if (dellact) {
                const arr = this.selected
                for (let i = 0; i < arr.length; i++) {
                    this.$store.commit("users/SET_INDEX", parseInt(arr[i].id));
                    this.destroy()
                }
            } else {
                this.destroy()
            }
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
        },

        save() {
            if (this.editedIndex > -1) {
                this.update().then((res) => {
                    if (res.status === 200) {
                        this.snackbar = {
                            snackbar: false,
                            vertical: true,
                            text: `${res.data} Data berhasil diperbaharui`,
                        }
                        this.getDataFromApi()
                    } else {
                        this.snackbar = {
                            snackbar: false,
                            vertical: true,
                            text: `${res.data} Data gagal diperbaharui!`,
                        }
                    }
                })
            } else {
                this.store().then((res) => {
                    if (res.status === 200) {
                        this.snackbar = {
                            snackbar: false,
                            vertical: true,
                            text: `${res.data} Data berhasil ditambahkan`,
                        }
                        this.getDataFromApi()
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