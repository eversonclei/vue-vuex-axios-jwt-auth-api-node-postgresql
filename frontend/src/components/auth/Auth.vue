<template>
    <div class="auth-content">
        <div class="auth-modal">
            <img src="@/assets/logo.png" width="300" alt="Logo" />
            <hr>

            <div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login'}}</div>
            <input v-if="showSignup" v-model="user.name" type="text" placeholder="Nome">
            <input v-model="user.email" name="email" type="text" placeholder="E-mail">
            <input v-model="user.password" name="password" type="password" placeholder="Senha">
            <input v-if="showSignup" v-model="user.confirmPassword" type="password" placeholder="Confirme a Senha">

            <b-button v-if="showSignup" @click="signup" variant="primary">Registrar</b-button>
            <b-button v-else @click="signin" variant="primary">Entrar</b-button> 
           
            <a href @click.prevent="showSignup = !showSignup">
                <span v-if="showSignup">Já tem cadastro? Acesse o login!</span>
                <span v-else>Não tem cadastro? Registre-se aqui!</span>
            </a>
        </div>
    </div>
</template>

<script>
import { baseApiUrl, showError, userCredential } from '@/global'
import axios from 'axios'

export default {
    name: 'Auth',
    data() {
        return {
            showSignup: false,
            user: {}
        }
    },
    methods: {
        signin() {
            axios.post(`${baseApiUrl}/signin`, this.user)
                 .then(resp => {
                     // Seta o usuário logado na store da aplicação
                     this.$store.commit('setUser', resp.data)
                     // Seta o usuário logado no localstorage do browser para manter a sessão
                     localStorage.setItem(userCredential, JSON.stringify(resp.data))
                     // Após ter feito a autenticação navega para raiz/tela principal da aplicação
                     this.$router.push({ path: '/' })
                 })
                 .catch(showError)
        },
        signup() {
            axios.post(`${baseApiUrl}/signup`, this.user)
                 .then(() => {
                     this.$toasted.global.defaultSuccess()
                     this.user = {}
                     this.showSignup = false
                 })
                 .catch(showError)
        }
    }
}
</script>

<style>
    .auth-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .auth-modal {
        background-color: #fff;
        width: 400px;
        padding: 25px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
        display: flex;
        flex-direction: column;
        align-items: center;
    }    

    .auth-title {
        font-size: 1.2rem;
        font-weight: 100;
        margin-bottom: 15px;
    }

    .auth-modal input {
        border: 1px solid #bbb;
        width: 100%;
        margin-bottom: 15px;
        padding: 3px 8px;
    }

    .auth-modal button {
        align-self: center;
        margin-top: 10px;
        padding: 5px 15px;
        cursor: pointer;
    }

    .auth-modal a {
        margin-top: 15px;
    }

    .auth-modal hr {
        border: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right,
            rgba(120, 120, 120, 0),
            rgba(120, 120, 120, 0.75),
            rgba(120, 120, 120, 0));
    }
</style>