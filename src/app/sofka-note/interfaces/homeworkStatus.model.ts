export interface HomeworkStatusModel {
  tareaID: string;
  titulo: string;
  calificacion: number;
  fechaEntregado: string | null;
  estado: string;
  urlarchivo: string;
  temaID: string;
  temaNombre: string;
  fechaLimite: Date;
  orden: number;
  archivoURL: string | null;
  retroalimentacion: string | null;
}
