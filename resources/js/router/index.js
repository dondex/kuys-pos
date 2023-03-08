import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import Menu from "../pages/Menu/Menu.vue";
import Table from "../pages/Table.vue";
import AddMenu from "../pages/Menu/AddMenu.vue";
import MenuList from "../pages/Menu/MenuList.vue";
import Sales from "../pages/Sales.vue";
import Kitchen from "../pages/Kitchen.vue";
import Reservation from "../pages/Reservation.vue";
import CreateCategories from "../pages/categories/CreateCategories.vue";
import EditCategories from "../pages/categories/EditCategories.vue";
import CategoriesList from "../pages/categories/CategoriesList.vue";
import Login from "../pages/auth/Login.vue";
import Register from "../pages/auth/Register.vue";

const routes = [
    {
        path: "/",
        name: "Sales",
        component: Sales,
        meta: { requiresAuth: true },
    },
    {
        path: "/table",
        name: "Table",
        component: Table,
        meta: { requiresAuth: true },
    },
    {
        path: "/kitchen",
        name: "Kitchen",
        component: Kitchen,
        meta: { requiresAuth: true },
    },
    {
        path: "/menu/:tableId",
        name: "Menu",
        component: Menu,
        meta: { requiresAuth: true },
    },
    {
        path: "/view-menu",
        name: "MenuList",
        component: MenuList,
        meta: { requiresAuth: true },
    },
    {
        path: "/add-menu",
        name: "AddMenu",
        component: AddMenu,
        meta: { requiresAuth: true },
    },

    {
        path: "/reservation",
        name: "Reservation",
        component: Reservation,
        meta: { requiresAuth: true },
    },

    {
        path: "/categories/create",
        name: "CreateCategories",
        component: CreateCategories,
        meta: { requiresAuth: true },
    },
    {
        path: "/categories/:id/edit",
        name: "EditCategories",
        component: EditCategories,
        meta: { requiresAuth: true },
        props: true,
    },
    {
        path: "/categories",
        name: "CategoriesList",
        component: CategoriesList,
        meta: { requiresAuth: true },
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: { requiresGuest: true },
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: { requiresGuest: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from) => {
    const authenticated = localStorage.getItem("authenticated");

    if (to.meta.requiresGuest && authenticated) {
        return {
            name: "Home",
        };
    } else if (to.meta.requiresAuth && !authenticated) {
        return {
            name: "Login",
        };
    }
});

export default router;
