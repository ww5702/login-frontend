// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import DaeunLogin from "../daeun/views/Login.vue";
import DaeunSignup from "../daeun/views/Signup.vue";
import JaeungLogin from "../jaeung/views/Login.vue";
import SilLogin from "../sil/views/Login.vue";
import MinjuLogin from "../minju/views/LoginForm.vue";
import MinjuSignup from "../minju/views/SignupForm.vue";
import MinjuFindPassword from "../minju/views/PasswordRecoveryForm.vue";
import JiyeongLogin from "../jiyeong/views/Login.vue";
import HyojeongLogin from "../hyojeong/views/Login.vue";

const routes = [
  { path: "/", component: Home },

  // 다은언니
  { path: "/daeun", component: DaeunLogin },
  { path: "/daeun/signup", component: DaeunSignup },

  // 재웅오빠
  { path: "/jaeung", component: JaeungLogin },

  // 실언니
  { path: "/sil", component: SilLogin },

  // 민주
  { path: "/minju", component: MinjuLogin },
  { path: "/minju/signup", component: MinjuSignup },
  { path: "/minju/password", component: MinjuFindPassword },

  // 지영이
  { path: "/jiyeong", component: JiyeongLogin },

  // 효정이
  { path: "/hyoheong", component: HyojeongLogin },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
