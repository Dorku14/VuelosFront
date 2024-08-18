import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "../login/screen/Login.vue";
import VueloScreen from "../vuelo/screen/VueloScreen.vue";
import { storeToRefs } from "pinia";
import { useLoginStore } from "../../modules/login/store/stateLogin";

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: Login },
  {
    path: "/vuelos",
    component: VueloScreen,
    beforeEnter: (to, from, next) => {
      const {user} = storeToRefs(useLoginStore());
      if(!user.value){
        router.push("/");
      }else{
        next();
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
