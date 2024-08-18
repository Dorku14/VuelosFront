export interface IVuelo {
    vueloId: number;
    aeropuertoDestinoId: number;
    aeropuertoDestinoCodigo: string;
    aeropuertoOrigenId: number;
    aeropuertoOrigenCodigo: string;
    aerolineaId: number;
    aerolineaNombre: string;
    horaSalida: string; 
    duracionViaje: string;
    costo:number
  }
  
 export  interface IVueloParams {
    aeropuertoDestinoId: number|null;
    aerolienaId: number|null;
    horaSalida: Date|null;
    fecha: string;
}