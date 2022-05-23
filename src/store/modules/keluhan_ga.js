import $axios from '../api'

const state = () => ({
    form: {
        user_id: '',
        role_id: '',
        dept_id: '',
        notes: '',
        image: [],
        agree: '',
    },
    dialog: false,
    dialogDelete: false,
    headers: [
        { text: 'Nama', value: 'user.name', sortable: false,},
        { text: 'Jabatan', value: 'role.rolename', sortable: false,},
        { text: 'Departemen', value: 'dept.deptname' },
        { text: 'Keterangan', value: 'notes', sortable: false,},
        { text: 'Agree', value: 'agree', sortable: false,},
        { text: 'Foto', value: 'image', sortable: false,},
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
    SET_FORM(state, payload) {
        state.form = {
            user_id: payload.user_id,
            role_id: payload.role_id,
            dept_id: payload.dept_id,
            notes: payload.notes,
            image: payload.image,
            agree: payload.agree,
        }
    },
    CLEAR_FORM(state) {
        state.form = {
            user_id: '',
            role_id: '',
            dept_id: '',
            notes: '',
            image: [],
            agree: '',
        }
    }
}

const actions = {
    index({ state, commit }) {
        return new Promise((resolve) => {
            commit('SET_LOADING', true)
            const { sortBy, sortDesc, page, itemsPerPage } = state.options
            $axios.get(`/keluhan-ga?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${state.search}`)
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
    storeGA({ state, dispatch }) {
        return new Promise((resolve) => {
            const form = state.form
            let formData = new FormData();
            formData.append("user_id", form.user_id);
            formData.append("role_id", form.role_id);
            formData.append("dept_id", form.dept_id);
            formData.append("status", 'false');
            formData.append("notes", form.notes);
            formData.append("image", form.image);
            formData.append("agree", form.agree);
            $axios.post(`/keluhan-ga`, formData)
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
            $axios.get(`/keluhan-ga/${state.editedIndex}`)
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
            formData.append("user_id", form.user_id);
            formData.append("role_id", form.role_id);
            formData.append("dept_id", form.dept_id);
            formData.append("notes", form.notes);
            formData.append("image", form.image);
            formData.append("agree", form.agree);
            $axios.put(`/keluhan-ga/${state.editedIndex}`, formData)
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
            $axios.delete(`/keluhan-ga/${state.editedIndex}`)
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
