import $axios from '../api'

const state = () => ({
    form: {
        rolename: '',
    },
    dialog: false,
    dialogDelete: false,
    headers: [
        { text: 'Jabatan', value: 'rolename', sortable: false,},
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
            rolename: payload.rolename,
        }
    },
    CLEAR_FORM(state) {
        state.form = {
            rolename: '',
        }
    }
}

const actions = {
    index({ state, commit }) {
        return new Promise((resolve) => {
            commit('SET_LOADING', true)
            const { sortBy, sortDesc, page, itemsPerPage } = state.options
            $axios.get(`/role?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${state.search}`)
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
            $axios.post(`/role`, state.form)
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
            $axios.get(`/role/${state.editedIndex}`)
                .then((response) => {
                    commit('SET_FORM', response.data)
                    resolve(response)
                })
                .catch((error) => {
                    resolve(error.response)
                })
        })
    },
    update({ state, dispatch }) {
        return new Promise((resolve) => {
            $axios.put(`/role/${state.editedIndex}`, state.form)
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
            $axios.delete(`/role/${state.editedIndex}`)
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
