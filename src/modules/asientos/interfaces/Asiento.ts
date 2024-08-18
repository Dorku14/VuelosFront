export interface IAsiento{
    asientoId:number,
    esApartado:boolean,
    esReservado:boolean,
    vueloId:number,
    vueloAsientoId: number;
    fechaApartado:string;
}

export interface IAsientoPost {
    vueloAsientoId: number;
    vueloId: number;
    usuarioId: number;
    asientoId: number;
    esReservado: boolean;
    esAparatado: boolean;
    fechaApartado:string |null;
}