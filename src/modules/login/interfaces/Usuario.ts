export interface IUsuarioSesion{
    usuario:string;
    contrasenia:string;
}

export interface IUsuario{
    usuarioId: number;
    tipoUsuarioId: number;
    tipoUsuarioNombre: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    userName: string;
    correo: string;
}