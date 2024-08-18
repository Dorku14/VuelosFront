import axios from "axios";
import { IVueloParams} from "../interfaces/Vuelo";
export const useVuelo = () =>{

    const obtenerVuelos = async(params:IVueloParams) =>{
        try{
            const resp = await axios.get("https://localhost:7117/api/Vuelo",{params:params});
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