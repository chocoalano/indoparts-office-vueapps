import $axios from '../api'

const state = () => ({
    authenticated: []
})

const mutations = {
    ASSIGN_USER_AUTH(state, payload) {
        state.authenticated = payload
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
    logout() {
        return new Promise((resolve) => {
            $axios.get(`logout`)
                .then((response) => {
                    localStorage.setItem('token', null)
                    commit('SET_TOKEN', null, { root: true })
                    resolve(response)
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
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
