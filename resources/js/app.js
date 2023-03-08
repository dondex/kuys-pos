import "./bootstrap";
import { createApp } from "vue";
import App from "../js/App.vue";
import "../css/app.css";
import router from "./router/index.js";
import store from "./store/store.js";

createApp(App).use(router).use(store).mount("#app");
