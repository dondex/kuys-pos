<template>
    <div>
        <h1>Home Page</h1>
        <h3>{{ name }}</h3>
    </div>
</template>

<script>
export default{
    data(){
        return{
            name: ''
        }
    },
    mounted(){
        axios
        .get('/api/user')
        .then((response)=> this.name = response.data.name)
        .catch(error=>{
            if(error.response.status === 401) {
                this.$emit('updateSidebar');
                localStorage.removeItem('authenticated');
                this.$router.push({name: "Login"});
            }
        });
    },
};
</script>
