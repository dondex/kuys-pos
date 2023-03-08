<template>
    <div class="categories-list">
      <h1>Categories List</h1>
      <!-- success message -->
      <div class="success-msg" v-if="success">
        <i class="fa fa-check"></i>
        Category Deleted successfully
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col" class="col-md-3">#</th>
            <th scope="col" class="col-md-6">Name</th>
            <th scope="col" class="col-md-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(category, index) in getCategories" :key="category.id">
            <th scope="row">{{ index+1 }}</th>
            <td>{{ category.name }}</td>
            <td>
              <router-link :to="{name: 'EditCategories', params:{id:category.id}}"><button class="btn btn-primary mx-1">edit</button></router-link>
              <button class="btn btn-danger mx-1" @click="destroy(category.id)">delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="index-categories">
        <router-link :to="{ name: 'CreateCategories' }"
          >Create Categories<span>&#8594;</span></router-link
        >
      </div>
    </div>
  </template>

  <script>
  import { mapActions, mapGetters } from "vuex";

  export default {
    computed: {
      ...mapGetters(["getCategories"]),
    },
    mounted() {
      this.fetchCategories();
    },
    methods: {
      ...mapActions(["fetchCategories", "deleteCategory"]),
      destroy(id) {
        this.deleteCategory(id)
          .then((success) => {
            if (success) {
              this.success = true;
              setInterval(() => {
                this.success = false;
              }, 2500);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
    data() {
      return {
        success: false,
      };
    },
  };
  </script>

  <style scoped>
  .categories-list {
    height: 80vh;
    background: #fff;
  }

  .categories-list h1 {
    font-weight: 300;
    padding: 50px 0 30px 0;
    text-align: center;
  }

  .categories-list .item {
    display: flex;
    justify-content: right;
    align-items: center;
    max-width: 300px;
    margin: 0 auto !important;
  }

  .categories-list .item p {
    font-size: 16px;
  }

  .categories-list .item p,
  .categories-list .item div,
  .categories-list .item {
    margin: 15px 8px;
  }

  .categories-list .item div a {
    padding: 6px 20px;
    background-color: #4caf50;
    color: #fff;
    font-size: 14px;
    display: inline-block;
  }

  .categories-list .item input {
    padding: 6px 13px;
    background-color: red;
    color: #fff;
    border: none;
    font-size: 16px;
    cursor: pointer;
    font-size: 14px;
  }

  .categories ul li {
    list-style: none;
    background-color: #494949;
    margin: 20px 5px;

    border-radius: 15px;
  }

  .categories ul {
    display: flex;
    justify-content: center;
  }

  .categories a {
    color: white;
    padding: 10px 20px;
    display: inline-block;
  }

  .create-categories a,
  .index-categories a {
    all: revert;
    margin: 20px 0;
    display: inline-block;
    text-decoration: none;
  }

  .create-categories a span,
  .index-categories a span {
    font-size: 22px;
  }

  .index-categories {
    text-align: center;
  }
  </style>
