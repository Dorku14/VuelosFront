import { defineStore } from "pinia";
import { ref } from "vue";
import {IUsuario} from '../interfaces/Usuario'
import router from "../../router/buildRoute";
export const useLoginStore = defineStore("login",() =>{
    const user = ref<IUsuario|null>(null);
    return ({
        user
    });
});