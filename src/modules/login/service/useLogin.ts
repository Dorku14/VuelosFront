import axios from "axios";
import {IUsuarioSesion} from '../interfaces/Usuario';
import {storeToRefs} from 'pinia'
import { useLoginStore } from "../store/stateLogin";
export const useLogin = () =>{
    const baseUrl = import.meta.env.VITE_BASE_URL_API;
    const {user} = storeToRefs(useLoginStore());
    const iniciarSesion = async(params:IUsuarioSesion) =>{
        try{
            const resp = await axios.get(baseUrl+"api/Usuario",{params:params});
            const data = resp.data;
            if(data){
                user.value = data;
            }
            return data;
        }catch(ex){
            throw ex;
        }
    }

    return({
        iniciarSesion
    });
}