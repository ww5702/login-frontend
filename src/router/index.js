// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import DaeunLogin from "../daeun/views/Login.vue";
import DaeunSignup from "../daeun/views/Signup.vue";
import JaeungLogin from "../jaeung/views/Login.vue";
import JaeUngSingUpPage from '../jaeung/views/SignUpPage.vue';
import JaeungHomePage from '../jaeung/views/HomePage.vue';

import SilLogin from "../sil/views/StartMain.vue";
import SilSignup from "../sil/views/Signup.vue";
import SilHelloWorld from "../sil/views/HelloWorld.vue";
import MinjuLogin from "../minju/views/LoginForm.vue";
import MinjuSignup from "../minju/views/SignupForm.vue";
import MinjuFindPassword from "../minju/views/PasswordRecoveryForm.vue";
import JiyeongLogin from "../jiyeong/views/Login.vue";
import JYSignUp from "../jiyeong/views/JYSignUp.vue";
import HyojeongLogin from "../hyojeong/views/Login.vue";
import Success from "../hyojeong/views/Success.vue";


const routes = [
  { path: "/", component: Home },

  // 다은언니
  { path: "/daeun", component: DaeunLogin },
  { path: "/daeun/signup", component: DaeunSignup },

  // 재웅오빠
  { path: "/jaeung", component: JaeungLogin },
  { path: '/jaeung/signup', component: JaeUngSingUpPage },
  { path: '/jaeung/home', component: JaeungHomePage },

  // 실언니
  { path: "/sil", component: SilLogin },
  { path: "/sil/signup", component: SilSignup },
  { path: "/sil/hello", component: SilHelloWorld },

  // 민주
  { path: "/minju", component: MinjuLogin },
  { path: "/minju/signup", component: MinjuSignup },
  { path: "/minju/password", component: MinjuFindPassword },

  // 지영이
  { path: "/jiyeong", component: JiyeongLogin },
  { path: "/jiyeong/signup", component: JYSignUp },

  // 효정이
  { path: "/hyojeong", component: HyojeongLogin },
  { path: "/hyojeong/success", component: Success }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
