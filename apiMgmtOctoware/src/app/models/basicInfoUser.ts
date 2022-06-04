export interface UserInfo {
    id_usr:     number;
    nombre_usr:     string;
    email:      string;
    estatus: boolean;
    tipo_usr:   string;
}

export interface UserInfoResponse{
    count: number,
    entries: AllUserInfo[]
}

export interface AllUserInfo {
    id_usr: number;
    nombre_usr: string;
    email:      string;
    estatus: boolean
    id_tipo_usr:   number;
}

export interface FavApiUsrResponse{
    count: Number;
    entries: FavApiUsr[];
}

export interface FavApiUsr {
    nombre_api: string;
    disp_api: string;
    ult_conexion_api: string;
    version_api: string;
}

export interface FavApiIdResponse{
    count: Number;
    entries: FavApiId[];
}

export interface FavApiId {
    id_fav: Number;
    id_end: Number;
    id_usr: Number;
    disponibilidad: Boolean;
}