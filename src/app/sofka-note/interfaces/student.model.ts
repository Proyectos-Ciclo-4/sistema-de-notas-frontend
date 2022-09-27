
import { EnrollmentModel } from './enrollment.model';

export interface StudentModel {
    _id:           string;
    nombre:        string;
    promedio:      number;
    avance:        number;
    inscripciones: EnrollmentModel[];
}




