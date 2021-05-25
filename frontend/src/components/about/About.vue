<template>
    <div> 
        <PageTitle icon="fa fa-address-card" main="Sobre" sub="" />
        <div class="about-me">
            <div class="about-icon">
                <Gravatar :email="'everson.clei@gmail.com'" alt="E-mail" />
            </div>
            <div class="about-info">
                <span class="about-name">Everson Clei</span>
                <a class="about-links" href="#"><i class="fa fa-envelope-square"></i> everson.clei@gmail.com</a>
                <a class="about-links" href="https://www.linkedin.com/in/eversonclei/" target="blank"><i class="fa fa-linkedin"></i> Linkedin</a>
                <a class="about-links" href="https://github.com/eversonclei" target="blank"><i class="fa fa-github"></i> Github</a>
            </div>
        </div>
    </div>  
</template>

<script>
import PageTitle from '../template/PageTitle'
import Gravatar from 'vue-gravatar'

export default {
    name: 'About',
    components: { PageTitle, Gravatar }
}
</script>

<style>
    .about-me {
        flex: 1;
        display: flex;
        height: 200px;
        border-radius: 8px;
        margin-bottom: 20px;
        background-color: #fff;
        padding: 10px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }

    .about-icon {
        display: flex;
        align-items: flex-start;       
    }

    .about-icon > img {
        border-radius: 50%;
    }

    .about-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0px 10px;
    }
    
    .about-name {
        padding: 0px 3px;
        font-size: 1.7rem;
    }

    .about-links {
        padding: 3px;
        font-size: 1rem;
    }
</style>