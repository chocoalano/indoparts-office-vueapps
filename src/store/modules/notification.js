import $axios from '../api'

const state = () => ({
})

const mutations = {
}

const actions = {
    index({ commit }, payload) {
        return new Promise((resolve) => {
            const { sortBy, sortDesc, page, itemsPerPage, search } = payload
            $axios.get(`/notification?page=${page}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`)
                .then((response) => {
                    resolve(response)
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
