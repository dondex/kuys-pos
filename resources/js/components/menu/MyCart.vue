<template>
    <div class="mycart">
        <div class="success-msg" v-if="success">
            <i class="fa fa-check"></i>
            Order created successfully
        </div>
        <div class="container-fluid menu-col-4">
            <div class="row">
                <h3>Table no. <span>{{ tableNumber }}</span></h3>
            </div>
            <div class="row">
                <div>
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col" class="col-5">Name</th>
                            <th scope="col" class="col-4">Q-ty</th>
                            <th scope="col" class="col-1">Price</th>
                            <th scope="col" class="col-2"></th>
                            </tr>
                        </thead>
                        <tbody v-for="item in cart" :key="item.id">
                            <tr>
                            <th scope="row">{{ item.title }}</th>
                            <td>
                                <i @click="reduceQty(item.id)" class="click-cursor fa-solid fa-angle-left"></i>
                                <span class="mx-4">{{ item.qty }}</span>
                                <i @click="addQty(item.id)" class="click-cursor fa-solid fa-angle-right"></i>
                            </td>
                            <td>{{ item.price }}</td>
                            <td class="text-center click-cursor"><i @click="removeMenu(item.id)" class="fa-solid fa-trash"></i></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>

            <div class="parent-cart">
                <div class="wrapper-cart">
                <hr>
                <div class="row px-3 my-2">
                <div class="col-md-6">
                    <h4>Sub-total</h4>
                </div>
                <div class="col-md-6 text-end">
                    SR {{ totalPrice }}
                </div>
                </div>
                <div class="row px-3 my-2">
                    <div class="col-md-6">
                        <h4>Available Tax</h4>
                    </div>
                    <div class="col-md-6 text-end">
                        0
                    </div>
                </div>
                <hr>
                <div class="row px-3">
                    <div class="col-md-6">
                        <h4 class="fw-bold">Total</h4>
                    </div>
                    <div   class="col-md-6 text-end">
                        <h4  class="fw-bold">SR {{ totalPrice }}</h4>


                    </div>
                </div>
                <hr/>
                <div class="row text-center">
                    <div class="col-md-6">
                        <div class="row">
                        <div class="col-md-6">
                            <h4 class="my-2">Receive</h4>
                        </div>
                        <div class="col-md-6">
                            <input v-model="receive" class="w-100 p-2 receive-input" style="height: 40px;" type="number">
                        </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row">
                        <div class="col-md-5">
                            <button @click="change = calculateChange(receive)" class="btn btn-success" style="height: 40px;">Change</button>
                        </div>
                        <div class="col-md-5 change-style text-center">
                            <h4 class="text-center my-auto py-1">SR {{ change }}</h4>
                        </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-5 p-3 status">
                    <div class="col-md-4">
                        <button @click="selectDineIn" :class="{'btn btn-danger w-100 active': currentStatus === 'dineIn', 'btn btn-success w-100': currentStatus !== 'dineIn'}" style="height: 50px;">Dine In</button>
                    </div>
                    <div class="col-md-4">
                        <button @click="selectTakeOut" :class="{'btn btn-danger w-100 active': currentStatus === 'takeOut', 'btn btn-success w-100': currentStatus !== 'takeOut'}" style="height: 50px;">Take Out</button>
                    </div>
                    <div class="col-md-4">
                        <button @click="selectReserved" :class="{'btn btn-danger w-100 active': currentStatus === 'reserved', 'btn btn-success w-100': currentStatus !== 'reserved'}" style="height: 50px;">Reserved</button>
                    </div>
                </div>

                <div class="row my-5 mx-1">
                    <div class="col-md-12">
                        <button v-if="statusSelected && cart.length" :disabled="isProcessing" @click="placeOrder" class="btn btn-success w-100" style="height: 60px;">
                        <span v-if="!isProcessing">Pay</span>
                        </button>
                    </div>
                </div>

            </div>

            </div>


        </div>

    </div>
</template>

<script>
import {mapGetters, mapActions } from 'vuex';

export default {
    data(){
        return {
            isProcessing: false,
            orderPlaced: false,
            success: false,
            receive: 0,
            change: 0,
            statusSelected: false,
            currentStatus: null
        };
    },
    computed: {
        ...mapGetters(['cart']),
        totalPrice(){
            return this.cart.reduce((a,b) => a+b.qty*b.price, 0)
        }
    },
    methods: {
        ...mapActions(["addQty", "reduceQty", "removeMenu", "emptyCart"]),
        calculateChange(receive) {
            return receive - this.totalPrice;
        },

        async placeOrder() {
            this.isProcessing = true;

            try {
                const response = await axios.post('/api/orders', {
                    customer_name: 'Admin',
                    customer_email: 'admin@example.com',
                    customer_phone: '1234567890',
                    total_price: this.totalPrice,
                    status: this.currentStatus // Add status field here
                });

                this.orderPlaced = true;
                this.success = true;
                this.isProcessing = false;
                this.emptyCart();

                setInterval(() => {
                    this.success = false;
                }, 2500);
            } catch (error) {
                console.error(error);
                this.isProcessing = false;
            }
        },
        selectDineIn() {
            this.currentStatus = 'dineIn';
            this.statusSelected = true
        // add other necessary code here
        },
        selectTakeOut() {
            this.currentStatus = 'takeOut';
            this.statusSelected = true
        // add other necessary code here
        },
        selectReserved() {
            this.currentStatus = 'reserved';
            this.statusSelected = true
        // add other necessary code here
        }
    }

};

</script>

<style>
.mycart{
    height: 100vh;
}
.menu-col-4{
    background-color: #fff;
    height: 80vh;
    border-radius: 10px;
}
.click-cursor{
    cursor: pointer;
}
.success-msg {
    padding: 10px 12px;
    border-radius: 3px;
    color: #270;
    background-color: #dff2bf;
    position: fixed;
    top: 30px;
    right: 30px;
}
.receive-input{
    border-radius: 5px;
}
.change-style{
    border: .5px solid black;
    border-radius: 5px;
    margin: auto;
    padding: 5px;
}


</style>
