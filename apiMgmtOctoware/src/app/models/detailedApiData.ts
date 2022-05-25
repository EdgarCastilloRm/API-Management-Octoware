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
}


export interface sendAPI{
    nombre_api:       string;
    version_api:      string;
    url_base:         string;
    descripcion_api:  string;
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
}

export interface Param {
    id_param:          number;
    nombre_param:      string;
    obligatorio_param: boolean;
    tipo_param:        string;
}

export interface Response  {
    id_respuestas_end: number;
    name_resp:         string;
    tipo_param:        string;
}
