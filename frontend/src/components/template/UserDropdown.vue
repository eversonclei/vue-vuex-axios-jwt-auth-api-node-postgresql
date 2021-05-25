<template>
    <div class="user-dropdown">
        <div class="user-button">
            <span class="d-none d-sm-block">{{ user.name }}</span>
            <div class="user-dropdown-img">
                <Gravatar :email="user.email" alt="Usuário" />
            </div>
        </div>
        <div class="user-dropdown-content">
            <router-link to="/admin" v-if="user.admin"><i class="fa fa-user"></i> Usuários</router-link>
            <router-link to="/about"><i class="fa fa-address-card"></i> Sobre</router-link>
            <a href @click.prevent="logout"><i class="fa fa-sign-out"></i> Logout</a>
        </div>
    </div>
</template>

<script>
import { userCredential } from '@/global'
import { mapState } from 'vuex'
import Gravatar from 'vue-gravatar'

export default {
    name: 'UserDropdown',
    components: { Gravatar },
    computed: mapState(['user']),
    methods: {
        logout() {
            // Remove usuário logado do localstorage
            localStorage.removeItem(userCredential)
            // Remove usuário logado da store da aplicação
            this.$store.commit('setUser', null)
            // Redireciona para tela de autenticação
            this.$router.push({ name: 'auth' })
        }
    }
}
</script>

<style>
    .user-dropdown {
        position: relative;
        height: 100%;
        cursor: pointer;
    }

    .user-button {
        display: flex;
        align-items: center;
        color: #fff;
        font-weight: 100;
        height: 100%;
        padding: 0px 20px;
    }

    .user-dropdown-img {
        margin: 0px 10px;
    }

    .user-dropdown-img > img {
        max-height: 50px;
        border-radius: 50px;
    }

    .user-dropdown-content {
        position: absolute;
        right: 10px;
        background-color: #f9f9f9;
        min-width: 180px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        padding: 10px;
        z-index: 1;
        
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        
        visibility: hidden;     
        opacity: 1;
        transition: visibility 0s, opacity 0.5s linear; 
    }

    .user-dropdown:hover .user-dropdown-content {
        visibility: visible;
        opacity: 1; 
    }

    .user-dropdown-content a {
        text-decoration: none;
        color: #333;
        padding: 10px;
    }

    .user-dropdown-content a:hover {
        text-decoration: none;
        color: #333;
        background-color: #ededed;
    }
</style>