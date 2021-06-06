<template>
	<div id="app" :class="{'hide-menu': !isMenuVisible || !user}">
		<Header title="VueJS - Autenticação de Usuários" 
			:hideToggle="!user" 
			:hideUserDropdown="!user" />	
		<Menu v-if="user" />
		<Loading v-if="validatingToken" />
		<Content v-else />	
		<Footer />
	</div>
</template>

<script>
import { baseApiUrl, userCredential } from '@/global'
import axios from 'axios'
import { mapState } from 'vuex'
import Header from '@/components/template/Header'
import Menu from '@/components/template/Menu'
import Content from '@/components/template/Content'
import Footer from '@/components/template/Footer'
import Loading from '@/components/template/Loading'

export default {
	name: "App",
	components: { Header, Menu, Content, Footer, Loading },
    computed: mapState(['isMenuVisible', 'user']),
	data: function() {
		return {
			validatingToken: true
		}
	},
	methods: {
		async validateToken() {
			this.validatingToken = true
			const json = localStorage.getItem(userCredential)
			const userData = JSON.parse(json)
            this.$store.commit('setUser', null)

			if (!userData) {
				this.validatingToken = false
				return this.$router.push({ name: 'auth' })
			}

			// Se esta setado, então faz uma requisição 
			const resp = await axios.post(`${baseApiUrl}/validateToken`, userData)
			if (resp.data) {
				this.$store.commit('setUser', userData)

				// Validação MediaQuery 
				if (this.$mq === 'xs' || this.$mq === 'sm') {
					//console.log('Passando na validação de MediaQuery.')
					this.$store.commit('toggleMenu', false) // Oculta menu dependendo do dispositivo!
				} 

			} else {
                localStorage.removeItem(userCredential)
                this.$router.push({ name: 'auth' })
			}

			this.validatingToken = false // Para que ele não fique eternamente validando token seta pra false no final
		}
	},
	created() {
		this.validateToken()
	}
}
</script>

<style>
	* {
		font-family: "Lato", sans-serif;
	}
	
	body {
		margin: 0;
	}

	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;	
		height: 100vh;
		display: grid;
		grid-template-rows: 60px 1fr 40px;
		grid-template-columns: 170px 1fr;
		grid-template-areas: 
			"header header"
			"menu content"
			"menu footer";
	}

	#app.hide-menu {
		grid-template-areas: 
			"header header"
			"content content"
			"footer footer";
	}
</style>