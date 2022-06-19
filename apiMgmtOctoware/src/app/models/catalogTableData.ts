export interface TableDataResponse{
    count: number,
    entries: TableData[]
}

export interface TableData {
    id_api:           number;
    nombre_api:       string;
    disp_api:         string;
    seguridad_api:    boolean;
    ult_conexion_api: Date;
    version_api:      string;
    url_base:         string;
    url_prueba:       string;
    api_key:          string;
    descripcion_api:  string;
}

export interface APICount {
    apis: number;
}

export interface MethodCount{
    tipo_end: string;
    methods: number;
}
