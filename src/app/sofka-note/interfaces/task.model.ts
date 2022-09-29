
export interface TaskModel {
    _id:         string;
    cursoID:     string;
    temaID:      string;
    titulo:      string;
    fechaLimite: string;
    porcentaje:  number;
    orden?: number | null
    descripcion?: string | null
}
