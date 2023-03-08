<template>
    <div>
      <div class="container menu-col-8">
        <div class="row p-3">
          <div class="col-md-6">

          </div>
        </div>
        <div class="row px-5">
          <div class="col-md-3" v-for="menu in menus" :key="menu.id">
            <div @click="addToCart(menu)" class="card" style="width: 14rem;">
              <img :src="menu.imagePath" class="card-img-top image-menu" alt="..." />
              <div class="p-3 card-body d-flex justify-content-between">
                <span class="card-text fw-bold">{{ menu.title }}</span>
                <span class="fw-bold">SR {{ menu.price }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script>
  import { mapGetters, mapActions } from "vuex";
  import store from "../../store/store.js";

  export default {
    name: "MenuComponent",
    created() {
      store.dispatch("fetchMenu");
    },
    computed: {
      ...mapGetters(["getMenu"]),
      menus() {
        return this.getMenu;
      },
    },
    methods: {
      ...mapActions(["addToCart"]),
    },
  };
  </script>

  <style scoped>
  .menu-col-8 {
    background-image: url("../../../../public/image/wood-bg.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 10px;
    height: 80vh;
  }
  .card-body {
    height: 5vh;
  }
  .image-menu {
    width: 100%;
    height: 150px;
  }
  .card {
    cursor: pointer;
  }
  .card:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  </style>
