export interface DetailedAPI {
    id_api:           number;
    nombre_api:       string;
    seguridad_api:    boolean;
    ult_conexion_api: Date;
    version_api:      string;
    url_base:         string;
    descripcion_api:  string;
    api_key:          string;
    disp_api:         string;
    url_prueba:       string;
}


export interface sendAPI{
    nombre_api:       string;
    version_api:      string;
    url_base:         string;
    descripcion_api:  string;
    api_key:          string;
    url_prueba:       string;
}

export interface Categories {
    id_cat:     number;
    nombre_cat: string;
}

export interface Endpoints {
    id_end:     number;
    nombre_end: string;
    tipo_end:   string;
    id_cat:     number;
}

export interface SpecificEndpoint {
    id_end:       number;
    nombre_end:   string;
    url_end:      string;
    docum_end:    string;
    pruebas_end:  string;
    expected_ans: string;
    tipo_end:     string;
    body:         string;
}

export interface Params {
    id_param:          number;
    nombre_param:      string;
    obligatorio_param: boolean;
    query:             boolean;
    tipo_param:        string;
}

export interface Resp {
    id_respuestas_end: number;
    name_resp:         string;
    tipo_param:        string;
}

export interface Header{
    id: number;
    nombre: string;
    key: string;
}