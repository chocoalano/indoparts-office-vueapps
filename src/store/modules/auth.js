import $axios from '../api'

const state = () => ({
    authenticated: [],
    UserOnline:[],
    permissions:[],
})

const mutations = {
    ASSIGN_USER_AUTH(state, payload) {
        state.authenticated = payload
    },
    ASSIGN_PERMISSION(state, payload) {
        state.permissions = payload
    },
    ASSIGN_USER_ONLINE(state, payload) {
        state.UserOnline = payload
    },
}

const actions = {
    submitRegister({ commit },payload) {
        localStorage.setItem('token', null)
        commit('SET_TOKEN', null, { root: true })
        return new Promise((resolve) => {
            $axios.post('/register', payload)
                .then((response) => {
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('expires_at', response.data.expires_at)
                    commit('SET_TOKEN', response.data.token, { root: true })
                    commit('SET_TOKEN_EXPIRED', response.data.expires_at, { root: true })
                    resolve(response)
                })
                .catch((error) => {
                    resolve(error.response)
                })
        })
    },
    submitLogin({ commit },payload) {
        localStorage.setItem('token', null)
        commit('SET_TOKEN', null, { root: true })
        return new Promise((resolve) => {
            $axios.post('/login', payload)
                .then((response) => {
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('expires_at', response.data.expires_at)
                    commit('SET_TOKEN', response.data.token, { root: true })
                    commit('SET_TOKEN_EXPIRED', response.data.expires_at, { root: true })
                    resolve(response)
                })
                .catch((error) => {
                    resolve(error.response)
                })
        })
    },
    logout({commit}) {
        return new Promise((resolve) => {
            $axios.post(`logout`)
                .then((response) => {
                    localStorage.setItem('token', null)
                    commit('SET_TOKEN', null, { root: true })
                    resolve(response.status)
                })
                .catch((error) => {
                    resolve(error.response)
                })
        })
    },
    getUserLogin({commit}) {
        return new Promise((resolve) => {
            $axios.get(`profile`)
                .then((response) => {
                    console.log(response.data.user);
                    commit('ASSIGN_USER_AUTH', response.data.user)
                    commit('ASSIGN_PERMISSION', response.data.permission)
                    resolve(response)
                })
                .catch((error) => {
                    resolve(error.response)
                })
        })
    },
    getAttrFormRegister() {
        return new Promise((resolve) => {
            $axios.get(`data-auth-form`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    resolve(error.response)
                })
        })
    },
    UserLoginList({commit}) {
        return new Promise((resolve) => {
            $axios.get(`list-user-login`)
                .then((response) => {
                    commit('ASSIGN_USER_ONLINE', response.data)
                    resolve(response)
                })
                .catch((error) => {
                    resolve(error.response)
                })
        })
    },
    Notification({commit}) {
        return new Promise((resolve) => {
            $axios.get(`count-notif`)
                .then((response) => {
                    commit('SET_NOTIF_COUNT', response.data.count, {root:true})
                    commit('SET_NOTIF_DATA', response.data.data, {root:true})
                    commit('SET_NOTIF', true, {root:true})
                    resolve(response)
                })
                .catch((error) => {
                    resolve(error.response)
                })
        })
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
