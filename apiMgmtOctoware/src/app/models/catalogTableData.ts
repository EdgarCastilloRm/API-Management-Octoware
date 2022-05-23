export interface TableDataResponse{
    count: number,
    entries: TableData[]
}

export interface TableData {
    id_api:           number;
    nombre_api:       string;
    tipo_disp:        string;
    seguridad_api:    boolean;
    ult_conexion_api: Date;
    version_api:      string;
}
