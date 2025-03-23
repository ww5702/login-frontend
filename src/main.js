import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap-icons/font/bootstrap-icons.css'

axios.defaults.baseURL = "http://localhost:8080"; // 백엔드 주소
axios.defaults.headers.common["Content-Type"] = "application/json";

createApp(App).use(router).mount("#app");
