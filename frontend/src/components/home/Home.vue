<template>
    <div class="home"> 
        <PageTitle icon="fa fa-home" main="Dashboard" 
            sub="Autenticação de usuários em VueJS + Bootstrap-Vue + Vue-Gravatar + Vue-Toasted + Axios + JWT + Backend NodeJS + PostgreSQL !!!" />
        <div class="stats">
            <Stat title="Usuários Ativos" :value="stat.users" icon="fa fa-user" color="#3282cd" /> 
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import Stat from './Stat'
import { baseApiUrl } from '@/global'
import axios from 'axios'

export default {
    name: 'Home',
    components: { PageTitle, Stat },
    data() {
        return {
            stat: {}
        }
    },
    methods: {
        getStats() {
            axios.get(`${baseApiUrl}/users/stats`) 
                 .then(resp => this.stat = resp.data
            )
        }
    },
    // Assim que o componente for montado dispara consulta na API
    mounted() {
        this.getStats()
    }

}
</script>

<style>
    .stats {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
</style>