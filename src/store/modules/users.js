import $axios from '../api'

const state = () => ({
    form: {
        role_id: '',
        dept_id: '',
        nik: '',
        name: '',
        password: '',
        password_confirmation: '',
        activation: true,
        avatar: []
    },
    dialog: false,
    dialogDelete: false,
    headers: [
        { text: 'Jabatan', value: 'roles.rolename', sortable: false,},
        { text: 'Departemen', value: 'dept.deptname', sortable: false,},
        { text: 'NIK', value: 'nik' },
        { text: 'Nama', value: 'name', sortable: false,},
        { text: 'Aktivasi', value: 'activation', sortable: false,},
        { text: 'Avatar', value: 'avatar', sortable: false,},
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
            dept_id: payload.dept_id,
            nik: payload.nik,
            name: payload.name,
            password: payload.password,
            password_confirmation: payload.password_confirmation,
            activation: payload.activation,
            avatar: payload.avatar,
        }
    },
    CLEAR_FORM(state) {
        state.form = {
            role_id: '',
            dept_id: '',
            nik: '',
            name: '',
            password: '',
            password_confirmation: '',
            activation: false,
            avatar: [],
        }
    }
}

const actions = {
    index({ state, commit }) {
        return new Promise((resolve) => {
            commit('SET_LOADING', true)
            const { sortBy, sortDesc, page, itemsPerPage } = state.options
            $axios.get(`/users?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${state.search}`)
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
            const form = state.form
            let formData = new FormData();
            formData.append("role_id", form.role_id);
            formData.append("dept_id", form.dept_id);
            formData.append("nik", form.nik);
            formData.append("name", form.name);
            formData.append("password", form.password);
            formData.append("password_confirmation", form.password_confirmation);
            formData.append("activation", form.activation);
            formData.append("avatar", form.avatar);
            $axios.post(`/users`, formData)
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
            $axios.get(`/users/${state.editedIndex}`)
                .then((response) => {
                    const newForm = {
                        role_id: response.data.role_id,
                        dept_id: response.data.dept_id,
                        name: response.data.name,
                        nik: response.data.nik,
                        password: '',
                        password_confirmation: '',
                        activation: response.data.activation,
                        avatar: [],
                    }
                    commit('SET_FORM', newForm)
                    resolve(response)
                })
                .catch((error) => {
                    resolve(error.response)
                })
        })
    },
    update({ state, dispatch }) {
        return new Promise((resolve) => {
            const form = state.form
            let formData = new FormData();
            formData.append("role_id", form.role_id);
            formData.append("dept_id", form.dept_id);
            formData.append("name", form.name);
            formData.append("nik", form.nik);
            formData.append("password", form.password);
            formData.append("password_confirmation", form.password_confirmation);
            formData.append("activation", form.activation);
            formData.append("avatar", form.avatar);
            $axios.put(`/users/${state.editedIndex}`, formData)
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
            $axios.delete(`/users/${state.editedIndex}`)
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
