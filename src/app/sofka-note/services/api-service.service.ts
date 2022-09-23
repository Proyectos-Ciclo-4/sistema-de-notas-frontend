import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseModel } from '../interfaces/course.model';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private courses: CourseModel[];

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
  }

  searchCourse(term: string) {
    return this.courses.filter((e) => e.titulo.includes(term));
  }
}
