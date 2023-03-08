<template>
    <div class="menu">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-4 ">
                    <MyCart/>
                </div>
                <div class="col-md-8 ">
                    <MyMenu/>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import MyMenu from '../../components/menu/MyMenu.vue';
import MyCart from '../../components/menu/MyCart.vue';

export default {
    name: "Menu",
    components: {
        MyMenu,
        MyCart
    },
    created() {
        // Retrieve the table ID from URL parameters
        const tableId = this.$route.params.tableId;

        // Fetch the menu data for the table using the table ID
        // Display the menu to the user
    }
}

</script>


<style scoped>
.menu{
    height: 80vh;
}

</style>
