import { HomeworkStatusModel } from './homeworkStatus.model';

export interface EnrollmentModel {
  cursoID: string;
  promedio: number;
  avance: number;
  estadosTarea: HomeworkStatusModel[];
  nombreCurso: string;
  fechaInscripcion: string;
}
