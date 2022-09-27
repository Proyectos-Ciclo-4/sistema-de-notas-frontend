import { HomeworkStatusModel } from './homeworkStatus.model';
export interface CourseGeneric {
    cursoID:          string;
    nombreCurso:      string;
    promedio:         number;
    avance:           number;
    fechaInscripcion: Date;
    estadosTarea:     HomeworkStatusModel[];
}