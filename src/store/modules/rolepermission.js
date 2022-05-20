import $axios from '../api'

const state = () => ({
    form: {
        role_id: '',
        permission_id: [],
    },
    dialog: false,
    dialogDelete: false,
    headers: [
        { text: 'Nama akses', value: 'roles.rolename', sortable: false,},
        { text: 'Base akses', value: 'permission.name', sortable: false,},
        { text: 'Actions', value: 'actions', sortable: false },
    ],
    search: '',
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
})

const mutations = {
    SET_SEARCH(state, payload) {
        state.search = payload
    },
    SET_DIALOG(state, payload) {
        state.dialog = payload
    },
    SET_DIALOG_DELETE(state, payload) {
        state.dialogDelete = payload
    },
    SET_SINGLESELECT(state, payload) {
        state.singleSelect = payload
    },
    SET_SELECTED(state, payload) {
        state.selected = payload
    },
    SET_DESSERT(state, payload) {
        state.desserts = payload
    },
    SET_TOTALDESSERTS(state, payload) {
        state.totalDesserts = payload
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    },
    SET_OPTIONS(state, payload) {
        state.options = payload
    },
    SET_INDEX(state, payload) {
        state.editedIndex = payload
    },
    SET_SNACKBAR(state, payload) {
        state.snackbar = {
            snackbar:payload.snackbar,
            vertical:payload.vertical,
            text:payload.text,
        }
    },
    SET_FORM(state, payload) {
        state.form = {
            role_id: payload.role_id,
        permission_id: payload.permission_id,
        }
    },
    CLEAR_FORM(state) {
        state.form = {
            role_id: '',
            permission_id: '',
        }
    }
}

const actions = {
    form_attr() {
        return new Promise((resolve) => {
            $axios.get(`/role-permission-attr-form`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    resolve(error.response)
                })
        })
    },
    index({ state, commit }) {
        return new Promise((resolve) => {
            commit('SET_LOADING', true)
            const { sortBy, sortDesc, page, itemsPerPage } = state.options
            $axios.get(`/role-permission?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${state.search}`)
                .then((response) => {
                    commit('SET_LOADING', false)
                    commit('SET_DESSERT', response.data.data)
                    commit('SET_TOTALDESSERTS', response.data.meta.total)
                    resolve(response)
                })
                .catch((error) => {
                    commit('SET_LOADING', false)
                    resolve(error.response)
                })
        })
    },
    store({ state, dispatch }) {
        return new Promise((resolve) => {
            $axios.post(`/role-permission`, state.form)
                .then((response) => {
                    resolve(response)
                    dispatch('index')
                })
                .catch((error) => {
                    resolve(error.response)
                })
        })
    },
    edit({ state, commit }) {
        return new Promise((resolve) => {
            $axios.get(`/role-permission/${state.editedIndex}`)
                .then((response) => {
                    const permission_id_data=[]
                    const arr = response.data
                    for (let i = 0; i < arr.length; i++) {
                        permission_id_data.push(arr[i].permission_id)
                    }
                    const form = {
                        role_id:state.editedIndex,
                        permission_id:permission_id_data
                    }
                    console.log(form);
                    commit('SET_FORM', form)
                    resolve(response)
                })
                .catch((error) => {
                    resolve(error.response)
                })
        })
    },
    update({ state, dispatch }) {
        return new Promise((resolve) => {
            $axios.put(`/role-permission/${state.editedIndex}`, state.form)
                .then((response) => {
                    resolve(response)
                    dispatch('index')
                })
                .catch((error) => {
                    resolve(error.response)
                })
        })
    },
    destroy({ dispatch, state }) {
        return new Promise((resolve) => {
            $axios.delete(`/role-permission/${state.editedIndex}`)
                .then((response) => {
                    resolve(response)
                    dispatch('index')
                })
                .catch((error) => {
                    resolve(error.response)
                })
        })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
