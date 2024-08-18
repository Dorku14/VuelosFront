import axios from "axios";
import { IAsientoPost } from "../interfaces/Asiento";
export const useAsiento = () =>{
    const baseUrl = import.meta.env.VITE_BASE_URL_API;
    const obtenerAsiento = async(vueloId:number) =>{
        try{
            const objParam = {
                vueloId:vueloId
            }
            const resp = await axios.get(baseUrl+"api/Asiento",{params:objParam});
            const data = resp.data;
            return data;
        }catch(ex){
            return null;
        }
    };

    const apartarAsientos = async(dataAsiento:IAsientoPost[]) =>{
        try{
            const resp = await axios.post(baseUrl+"api/Asiento/Apartar",dataAsiento);
            const data = resp.data;
            alert("Asientos apartados");
            return data;
        }catch(ex){
            return null;
        }
    };

    const comprarAsientos = async(dataAsiento:IAsientoPost[]) =>{
        try{
            const resp = await axios.post(baseUrl+"api/Asiento/Comprar",dataAsiento);
            const data = resp.data;
            alert("Asientos comprados su numero de confirmación es: "+data.mensaje);
            return data;
        }catch(ex){
            return null;
        }
    }
    return({
        obtenerAsiento,
        apartarAsientos,
        comprarAsientos
    });
}