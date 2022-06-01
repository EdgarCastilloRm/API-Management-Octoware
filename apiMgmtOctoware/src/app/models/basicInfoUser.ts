export interface UserInfo {
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