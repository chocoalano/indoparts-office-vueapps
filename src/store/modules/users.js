import $axios from '../api'

const state = () => ({
    form: {
        role_id: '',
        dept_id: '',
        name: '',
        nik: '',
        password: '',
        password_confirmation: '',
        activation: true,
        avatar: []
    }
})

const mutations = {
    SET_FORM(state, payload) {
        state.form = {
            role_id:payload.role_id,
            dept_id:payload.dept_id,
            name:payload.name,
            nik:payload.nik,
            password:payload.password,
            password_confirmation:payload.password_confirmation,
            activation:payload.activation,
            avatar:payload.avatar,
        }
    },
    CLEAR_FORM(state){
        state.form = {
            role_id:'',
            dept_id:'',
            name:'',
            nik:'',
            password:'',
            password_confirmation:'',
            activation:false,
            avatar:[],
        }
    }
}

const actions = {
    index() {
        return new Promise((resolve) => {
            $axios.get(`/users?page=1&limit=10`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    resolve(error.response)
                })
        })
    },
    store({state}){
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
            $axios.post(`/users`,formData)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    resolve(error.response)
                })
        })
    },
    edit({commit},payload){
        return new Promise((resolve) => {
            $axios.get(`/users/${payload}`)
                .then((response) => {
                    const newForm={
                        role_id:response.data.role_id,
                        dept_id:response.data.dept_id,
                        name:response.data.name,
                        nik:response.data.nik,
                        password:'',
                        password_confirmation:'',
                        activation:response.data.activation,
                        avatar:[],
                    }
                    console.log(newForm);
                    commit('SET_FORM', newForm)
                    resolve(response)
                })
                .catch((error) => {
                    resolve(error.response)
                })
        })
    },
    update({state},payload){
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
            // formData.append("_method", 'patch');
            $axios.patch(`/users/${payload}`,formData)
                .then((response) => {
                    console.log(response.status);
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
