import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseModel } from '../interfaces/course.model';
import { TopicModel } from '../interfaces/topic.model';
import { data } from '../../../assets/db/courses';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private courses: CourseModel[];
  private topics: any[];
  private deliveries: any[];
  private inscriptions: any[];

  constructor(private storage: Storage) {
    this.courses = [...data] as CourseModel[];

    this.topics = this.courses.reduce((ant: TopicModel[], act: CourseModel) => {
      return (ant = [
        ...ant,
        ...act?.temas.map((ele) => {
          return { ...ele };
        }),
      ]);
    }, []);

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

    this.inscriptions = [
      {
        curso: 'Curso # 1',
        fecha: '22/09/2022',
      },
      {
        curso: 'Curso # 2',
        fecha: '22/09/2022',
      },
      {
        curso: 'Curso # 3',
        fecha: '22/09/2022',
      },
      {
        curso: 'Curso # 4',
        fecha: '22/09/2022',
      },
    ];
  }

  searchCourse(term: string) {
    return this.courses.filter((e) => e.titulo.includes(term));
  }

  getTopic(courseId: string) {
    return this.topics;
  }

  getDeliveries(courseId: string, studentId: string, topicId: string) {
    return this.deliveries;
  }

  uploapFile(file: any, name: string) {
    const filesRef = ref(this.storage, `entregas/${name}`);
    return uploadBytes(filesRef, file);
  }

  getInscriptions(studentid: string, courseId: string) {
    return this.inscriptions;
  }
}
