<template>
    <div>
        <div class="wrapper">
            <nav id="sidebar" class="sidebar js-sidebar">
                <div class="sidebar-content js-simplebar">
                    <router-link class="sidebar-brand" :to="{name: 'Sales'}">
                        <span class="align-middle">POS</span>
                    </router-link>

                    <SideBar :loggedIn="loggedIn"/>

                </div>
            </nav>

            <div class="main">
                <nav class="navbar navbar-expand navbar-light navbar-bg">
                <a class="sidebar-toggle js-sidebar-toggle">
                    <i class="hamburger align-self-center"></i>
                </a>


                </nav>

                <main class="content">
                    <router-view @update-sidebar="updateSidebar"></router-view>
                </main>

                <Footer />

            </div>
        </div>
    </div>
</template>


<script>
import SideBar from './components/SideBar.vue';
import Footer from './components/Footer.vue';

export default{
    name: "App",
    components: {
        SideBar,
        Footer,
    },
    data(){
        return {
            loggedIn: false,
        };
    },
    methods: {
        updateSidebar(){
        this.loggedIn = !this.loggedIn;
        localStorage.setItem('authenticated', this.loggedIn)
        },
    },
    mounted(){
        if(localStorage.getItem('authenticated') === "true" ){
            this.loggedIn = true;
        } else {
            this.loggedIn = false;
        }
    }
};


</script>
