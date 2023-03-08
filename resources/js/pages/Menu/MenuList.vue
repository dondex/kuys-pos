<template>
    <div class="categories-list">
      <h1>Menu List</h1>
      <!-- success message -->
      <div class="success-msg" v-if="success">
          <i class="fa fa-check"></i>
          Menu Deleted successfully
        </div>
      <table class="table">
        <thead>
            <tr>

            <th scope="col" class="col-md-3">#</th>
            <th scope="col" class="col-md-3">Name</th>
            <th scope="col" class="col-md-3">Price</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(menu, index) in menus" :key="menu.id">
            <th scope="row">{{ index+1 }}</th>
            <td>{{ menu.title }}</td>
            <td>{{ menu.price }}</td>
            <td>
                <button class="btn btn-danger mx-1" @click="destroy(menu.id)">delete</button>
            </td>

            </tr>
        </tbody>
    </table>
      <div class="index-categories">
        <router-link :to="{ name: 'AddMenu' }"
          >Create Menu<span>&#8594;</span></router-link
        >
      </div>
    </div>
  </template>

  <script>
  export default {
    emits: ["updateSidebar"],
    data(){
        return {
            menus: [],
            success: false,
        }
    },
    methods: {
        destroy(id){
            axios
            .delete('/api/menus/' + id)
            .then((response)=> {
                this.success = true
                setInterval(() => {
                    this.success = false;
                }, 2500);
                this.fetchMenus();
            })
            .catch((error)=>{
                console.log(error);
            });
        },
        fetchMenus(){
                axios
                .get('/api/menus')
                .then((response)=> this.menus = response.data.data)
                .catch((error)=>{
                    console.log(error);
                });
        }
    },
    mounted(){
        axios
            .get('/api/menus')
            .then((response)=> this.menus = response.data.data)
            .catch((error)=>{
                console.log(error);
            });
    }
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
