import { Component, OnInit } from '@angular/core';
import { CourseModel } from '../../interfaces/course.model';
import { ApiServiceService } from '../../services/api-service.service';
import { TopicModel } from '../../interfaces/topic.model';
import { SweetalertService } from '../../../shared/service/sweetalert.service';
import { getDownloadURL } from '@angular/fire/storage';

import { v4 as uuidv4, v4 } from 'uuid';
import { Auth } from '@angular/fire/auth';
import { CourseGeneric } from '../../interfaces/courseGeneric';

@Component({
  selector: 'app-delivery-task',
  templateUrl: './delivery-task.component.html',
  styleUrls: ['./delivery-task.component.scss'],
})
export class DeliveryTaskComponent implements OnInit {
  course: CourseGeneric | null = null;
  courses: CourseGeneric[] = [];
  termSearch: string = '';
  showSuggestion: boolean = false;
  topics: TopicModel[] = [];
  topic: TopicModel | null = null;
  deliveries: any[] = [];
  file: any;
  idDelivery: string = '';
  validExtension: string[] = ['pdf', 'docx', 'pptx', 'txt', 'xlsx'];

  constructor(
    private api$: ApiServiceService,
    private swal$: SweetalertService,
    private auth$: Auth
  ) {}

  ngOnInit(): void {}

  courseSuggestions(termSearch: string) {
    this.course = null;
    this.termSearch = termSearch;
    this.showSuggestion = true;
    this.topics = [];
    if (termSearch != '') {
      if (termSearch != '') {
        this.api$
          .searchCourseByStudent(termSearch, this.auth$.currentUser?.uid!)
          .subscribe({
            next: (res) => {
              this.courses = res;
            },
          });
      } else {
        this.courses = [];
      }
    } else {
      this.courses = [];
    }
  }

  selectCourse(course: CourseGeneric) {
    this.termSearch = course.nombreCurso;
    this.course = course;
    this.courses = [];
    this.showSuggestion = false;
  }

  clearFilter() {
    this.topics = [];
    this.course = null;
    this.termSearch = '';
  }
  onUpload(event: any, idDelivery: string) {
    const { name } = event.target.files[0];
    const extension = name.split('.').pop().toLowerCase().trim();
    if (this.validExtension.includes(extension)) {
      this.file = event.target.files[0];
      this.idDelivery = idDelivery;
      return;
    }
    this.file = null;
    this.swal$.errorMessage(
      'Extensión invalida',
      `Las extensiones permitidas son: ${this.validExtension}`
    );
  }

  saveFile() {
    //TODO: VALIDAR SI EL USUARIO YA ENTREGO EL ARCHIVO
    const nameFile = `${v4()}.${this.file.name.split('.').pop()}`;
    const title = 'Estas seguro de realizar la entrega?';
    const text = 'Una vez envia no se podra revertir';
    const btnMessage = 'Si, enviar';
    this.swal$.confirmationPopup(title, text, btnMessage).then((result) => {
      if (result.isConfirmed) {
        this.api$.uploapFile(this.file, nameFile).then(async (res) => {
          const url = await getDownloadURL(res.ref);
          console.log(url);
          this.swal$.succesMessage('Entrega realizada con éxito');
          this.file = null;
        });
        this.file = null;
      }
    });
  }

  searchDelivery() {
    this.deliveries = this.api$.getDeliveries(
      this.course?.cursoID || '',
      '1',
      this.topic?.temaID || ''
    );
  }
}
