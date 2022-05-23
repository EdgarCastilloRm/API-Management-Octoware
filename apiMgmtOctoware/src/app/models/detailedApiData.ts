export interface DetailedAPI {
    id_api:           number;
    nombre_api:       string;
    seguridad_api:    boolean;
    ult_conexion_api: Date;
    version_api:      string;
    url_base:         string;
    descripcion_api:  string;
    api_key:          string;
    id_disp:          number;
}


export interface sendAPI{
    nombre_api:       string;
    version_api:      string;
    url_base:         string;
    descripcion_api:  string;
}