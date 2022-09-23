import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseModel } from '../interfaces/course.model';
import { TopicModel } from '../interfaces/topic.model';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private courses: CourseModel[];
  private topics: TopicModel[];

  constructor() {
    this.courses = [
      {
        cursoID: '1',
        titulo: 'Java reactivo',
      },
      {
        cursoID: '2',
        titulo: 'Java funcional',
      },
      {
        cursoID: '3',
        titulo: 'Node',
      },
      {
        cursoID: '4',
        titulo: 'Scrum master',
      },
      {
        cursoID: '5',
        titulo: 'Master en javascrip',
      },
      {
        cursoID: '6',
        titulo: 'abcd',
      },
    ];
    this.topics = [
      {
        temaID: '1',
        orden: 2,
        titulo: 'titulo # 1',
      },
      {
        temaID: '2',
        orden: 2,
        titulo: 'titulo # 2',
      },
      {
        temaID: '1',
        orden: 3,
        titulo: 'titulo # 3',
      },
    ];
  }

  searchCourse(term: string) {
    return this.courses.filter((e) => e.titulo.includes(term));
  }

  getTopic(courseId:string) {
    return this.topics
  }
}
