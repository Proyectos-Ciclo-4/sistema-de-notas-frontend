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
import { DeliveryCommand } from '../interfaces/commands/deliveryCommand';
import { GradeCommand } from '../interfaces/commands/gradeCommand';
import { DeleteTaskCommand } from '../interfaces/commands/deleteTaskCommand';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private BASE_URL: string = environment.baseUrl;

  constructor(private storage: Storage, private http: HttpClient) {}

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

  deliverHomework(delivery: DeliveryCommand): Observable<DeliveryCommand> {
    return this.http.post<DeliveryCommand>(
      `${this.BASE_URL}/entregarTarea`,
      delivery
    );
  }

  deleteTask(
    deleTaskCommand: DeleteTaskCommand
  ): Observable<DeleteTaskCommand> {
    return this.http.post<DeleteTaskCommand>(
      `${this.BASE_URL}/eliminarTarea`,
      deleTaskCommand
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

  uploapFile(
    file: any,
    course: string,
    topic: string,
    task: string,
    name: string
  ) {
    const filesRef = ref(
      this.storage,
      `entregas/${course}/${topic}/${task}/${name}`
    );
    return uploadBytes(filesRef, file);
  }

  getInscriptions(studentId: string) {
    return this.http.get<StudentModel>(
      `${this.BASE_URL}/buscarAlumno/${studentId}`
    );
  }

  getStudentByCourseId(courseId: string): Observable<StudentModel[]> {
    return this.http.get<StudentModel[]>(
      `${this.BASE_URL}/encontrarEstudiantesEnCurso/${courseId}`
    );
  }

  gradeTask(gradeCommand: GradeCommand): Observable<GradeCommand> {
    return this.http.post<GradeCommand>(
      `${this.BASE_URL}/calificarTarea`,
      gradeCommand
    );
  }

  getCourseById(courseId: string): Observable<CourseModel> {
    return this.http.get<CourseModel>(
      `${this.BASE_URL}/buscarCurso/${courseId}`
    );
  }
}
