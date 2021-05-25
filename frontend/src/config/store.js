import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

//require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkV2ZXJzb24gQ2xlaSIsImVtYWlsIjoiZXZlcnNvbi5jbGVpQGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE2MjE3MTU4MzIsImV4cCI6MTYyMTk3NTAzMn0.cS4Zk17T7sCuUKh2uA0CNQAE3k1qquEUTlnZ9v09bpY'

export default new Vuex.Store({
    state: {
        isMenuVisible: false,
        user: null
        // user: {
        //     name: 'Usuário Mock',
        //     email: 'everson.clei@gmail.com'
        // }
    },
    mutations: {
        toggleMenu(state, isVisible) {
            if (!state.user) { 
                state.isMenuVisible = false
                return
            } 

            // Caso usuário setado prossegue validando aqui
            if (isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
        },
        setUser(state, user) {
            state.user = user
            if (user) {
                // Se usuário foi setado corretamente, então define token para novas requests!
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}` 
                state.isMenuVisible = true
            } else {
                delete axios.defaults.headers.common['Authorization']
                state.isMenuVisible = false
            }
        }
    }
})