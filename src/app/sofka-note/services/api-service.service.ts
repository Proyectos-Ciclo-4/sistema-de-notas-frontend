import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseModel } from '../interfaces/course.model';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CourseCommand } from '../interfaces/commands/courseCommand';
import { TopicCommand } from '../interfaces/commands/topicCommand';
import { TaskCommand } from '../interfaces/commands/taskCommand';
import { EnrollCommand } from '../interfaces/commands/enrollCommand';
import { StudentModel } from '../interfaces/student.model';
import { CourseGeneric } from '../interfaces/courseGeneric';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private deliveries: any[];
  private BASE_URL: string = environment.baseUrl;

  constructor(private storage: Storage, private http: HttpClient) {
    this.deliveries = [
      {
        numero: 1,
        tareaID: '1',
        titulo: 'Tarea # 1',
        limite: '27/10/2022',
        calificacion: 35,
        fechaEntregado: '09/10/2022',
        URLArchivo: 'https://www.google.com.co/',
        estado: true,
      },
      {
        numero: 2,
        tareaID: '12',
        titulo: 'Tarea # 1',
        limite: '27/10/2022',
        calificacion: 35,
        fechaEntregado: '09/10/2022',
        URLArchivo: 'https://www.google.com.co/',
        estado: true,
      },
    ];
  }

  createCourse(courseCommand: CourseCommand): Observable<CourseCommand> {
    return this.http.post<CourseCommand>(
      `${this.BASE_URL}/crearCurso`,
      courseCommand
    );
  }

  createTopic(topicCommand: TopicCommand): Observable<TopicCommand> {
    return this.http.post<TopicCommand>(
      `${this.BASE_URL}/crearTema`,
      topicCommand
    );
  }

  createTask(taskCommand: TaskCommand): Observable<TopicCommand> {
    return this.http.post<TopicCommand>(
      `${this.BASE_URL}/crearTarea`,
      taskCommand
    );
  }

  enrollCourse(enrollCommad: EnrollCommand): Observable<EnrollCommand> {
    return this.http.post<EnrollCommand>(
      `${this.BASE_URL}/inscribirEstudiante`,
      enrollCommad
    );
  }

  searchCourse(term: string, teacherId: string): Observable<CourseModel[]> {
    return this.http.get<CourseModel[]>(
      `${this.BASE_URL}/buscarCursoTituloProfesor/${term}/${teacherId}`
    );
  }

  searchAllCourse(term: string): Observable<CourseModel[]> {
    return this.http.get<CourseModel[]>(
      `${this.BASE_URL}/buscarTituloCurso/${term}`
    );
  }

  searchCourseByStudent(
    term: string,
    idStudent: string
  ): Observable<CourseGeneric[]> {
    return this.http.get<CourseGeneric[]>(
      `${this.BASE_URL}/encontrarInscripcion/${term}/${idStudent}`
    );
  }

  getDeliveries(courseId: string, studentId: string, topicId: string) {
    return this.deliveries;
  }

  uploapFile(
    file: any,
    course: string,
    topic: string,
    name: string
  ) {
    const filesRef = ref(this.storage, `entregas/${course}/${topic}/${name}`);
    return uploadBytes(filesRef, file);
  }

  getInscriptions(studentId: string) {
    return this.http.get<StudentModel>(
      `${this.BASE_URL}/buscarAlumno/${studentId}`
    );
  }
}
