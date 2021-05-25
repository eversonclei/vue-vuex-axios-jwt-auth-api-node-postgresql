<template>
    <div class="menu" v-show="isMenuVisible">
        <router-link to="/"><i class="fa fa-home"></i> Dashboard</router-link>
        <router-link to="/admin" v-if="user.admin"><i class="fa fa-user"></i> Usuários</router-link>
        <router-link to="/about"><i class="fa fa-address-card"></i> Sobre</router-link>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Menu',
    computed: mapState(['isMenuVisible', 'user'])
}
</script>

<style>
    .menu {
        grid-area: menu;
        background: linear-gradient(to right, #232526, #414345);
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        padding: 10px;
        z-index: 1;
    }

    .menu a {
        text-decoration: none;
        color: #fff;
        padding: 10px;
    }

    .menu a:hover {
        text-decoration: none;
        color: #333;
        background-color: #ededed;
    }

    .menu-itens {
        position: absolute;
        left: 0px;
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

    .menu-itens {
        visibility: visible;
        opacity: 1; 
    }

    .menu-itens a {
        text-decoration: none;
        color: #333;
        padding: 10px;
    }

    .menu-itens a:hover {
        text-decoration: none;
        color: #333;
        background-color: #ededed;
    }
</style>