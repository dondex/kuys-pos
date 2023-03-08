import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
    state: {
        menus: [],
        categories: [],
        cart: [],
        orders: [],
        selectedTableId: null,
    },
    mutations: {
        setMenu(state, menus) {
            state.menus = menus;
        },
        setCategory(state, categories) {
            state.categories = categories;
        },
        addItemToCart(state, menu) {
            const addedMenu = state.cart.find((menus) => menus.id === menu.id);
            if (addedMenu) {
                addedMenu.qty++;
            } else {
                state.cart.push({ ...menu, qty: 1 });
            }
        },
        addQty(state, id) {
            const currentMenu = state.cart.find((menus) => menus.id === id);
            currentMenu.qty++;
        },
        reduceQty(state, id) {
            const currentMenu = state.cart.find((menus) => menus.id === id);
            if (currentMenu.qty > 1) {
                currentMenu.qty--;
            } else {
                state.cart = state.cart.filter((menus) => menus.id !== id);
            }
        },
        removeMenu(state, id) {
            state.cart = state.cart.filter((menus) => menus.id !== id);
        },
        emptyCart(state) {
            state.cart = [];
        },

        setSelectedTableId(state, tableId) {
            state.selectedTableId = tableId;
        },

        setOrders(state, orders) {
            state.orders = orders;
        },
    },
    actions: {
        async fetchMenu({ commit }) {
            const response = await axios.get("/api/menus");
            const menus = response.data.data;
            commit("setMenu", menus);
        },
        async fetchCategories({ commit }) {
            const response = await axios.get("/api/categories");
            const categories = response.data;
            commit("setCategory", categories);
        },
        async deleteCategory({ dispatch }, id) {
            try {
                await axios.delete(`/api/categories/${id}`);
                dispatch("fetchCategories");
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },

        addToCart({ commit }, menu) {
            commit("addItemToCart", menu);
        },
        addQty({ commit }, id) {
            commit("addQty", id);
        },
        reduceQty({ commit }, id) {
            commit("reduceQty", id);
        },
        removeMenu({ commit }, id) {
            commit("removeMenu", id);
        },
        emptyCart({ commit }) {
            commit("emptyCart");
        },
        selectTable({ commit }, tableId) {
            commit("setSelectedTableId", tableId);
        },

        async fetchOrders({ commit }) {
            const response = await axios.get("/api/orders");
            const orders = response.data.orders;
            commit("setOrders", orders);
        },
    },
    getters: {
        getMenu: (state) => {
            if (state.filteredMenus && state.filteredMenus.length > 0) {
                return state.filteredMenus;
            }
            return state.menus;
        },
        getCategories: (state) => state.categories,

        cart: (state) => state.cart,
    },
});

export default store;
