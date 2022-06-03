export interface UserInfo {
    id_usr:     Number;
    nombre_usr:     string;
    email:      string;
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
    id_tipo_usr:   number;
}

export interface FavApiUsrResponse{
    count: Number;
    entries: FavApiUsr[];
}

export interface FavApiUsr {
    nombre_api: string;
    nombre_cat: string;
    nombre_end: string;
    tipo_end: string;
}