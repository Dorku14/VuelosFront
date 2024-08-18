import axios from "axios";
import { IVueloParams} from "../interfaces/Vuelo";
export const useVuelo = () =>{
    const baseUrl = import.meta.env.VITE_BASE_URL_API;
    const obtenerVuelos = async(params:IVueloParams) =>{
        try{
            const resp = await axios.get(baseUrl+"api/Vuelo",{params:params});
            const data = resp.data;
            return data;
        }catch(ex){
            return null;
        }
    }

    return({
        obtenerVuelos
    });
}