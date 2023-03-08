<template>
    <div>
        <ul class="sidebar-nav">
                    <li class="sidebar-header">Features</li>

                    <li class="sidebar-item" v-if="loggedIn">
                        <router-link class="sidebar-link" :to="{name: 'Table'}">
                            <i class="align-middle" data-feather="shopping-bag"></i>
                            <span class="align-middle">Order System</span>
                        </router-link>
                    </li>

                    <li class="sidebar-item ">
                        <router-link class="sidebar-link" v-if="loggedIn" :to="{name: 'MenuList'}">
                            <i class="align-middle" data-feather="folder"></i>
                            <span class="align-middle">View Menus</span>
                        </router-link>
                    </li>

                    <li class="sidebar-item ">
                        <router-link class="sidebar-link" v-if="loggedIn" :to="{name: 'AddMenu'}">
                            <i class="align-middle" data-feather="plus-circle"></i>
                            <span class="align-middle">Add Menu</span>
                        </router-link>
                    </li>

                    <li class="sidebar-item ">
                        <router-link class="sidebar-link" v-if="loggedIn" :to="{name: 'CategoriesList'}">
                            <i class="align-middle" data-feather="folder"></i>
                            <span class="align-middle">View Categories</span>
                        </router-link>
                    </li>



                    <li class="sidebar-item ">
                        <router-link class="sidebar-link" v-if="loggedIn" :to="{name: 'CreateCategories'}">
                            <i class="align-middle" data-feather="plus-circle"></i>
                            <span class="align-middle">Create Category</span>
                        </router-link>
                    </li>

                    <li class="sidebar-item ">
                        <router-link class="sidebar-link" v-if="loggedIn" :to="{name: 'Reservation'}">
                            <i class="align-middle" data-feather="mail"></i>
                            <span class="align-middle">Reservation</span>
                        </router-link>
                    </li>

                    <li class="sidebar-item ">
                        <router-link class="sidebar-link" v-if="loggedIn" :to="{name: 'Sales'}">
                            <i class="align-middle" data-feather="lock"></i>
                            <span class="align-middle">Sales</span>
                        </router-link>
                    </li>

                    <li class="sidebar-item">
                    <router-link class="sidebar-link" v-if="!loggedIn" :to="{name: 'Login'}">
                        <i class="align-middle" data-feather="log-in"></i>
                        <span class="align-middle">Log in</span>
                    </router-link>
                    </li>

                    <li class="sidebar-item">
                    <router-link class="sidebar-link" v-if="!loggedIn" :to="{name: 'Register'}">
                        <i class="align-middle" data-feather="edit-2"></i>
                        <span class="align-middle">Register</span>
                    </router-link>
                    </li>

                    <li class="sidebar-item">
                    <a class="sidebar-link" href="" @click="logout">
                        <i class="align-middle" data-feather="log-out"></i>
                        <span class="align-middle">Log out</span>
                    </a>
                    </li>
                </ul>
    </div>
</template>

<script>
export default{
    props: ['loggedIn'],
    data(){
        return{
            name: ''
        }
    },
    mounted(){
        axios
        .get('/api/user')
        .then((response)=> (this.name = response.data.name))
        .catch(error=>console.log(error));
    },
    methods: {
        logout(){
            axios
            .post('/api/logout')
            .then((response)=> {this.$router.push({name: 'Home'});
            localStorage.removeItem('authenticated');
            this.$emit('update-sidebar');
        }).catch(error=>console.log(error));
        },

    }
};
</script>


<style>
.router-link-active{
    color: #fff !important;
    background-color: #4C6CC5 !important;
}
</style>
