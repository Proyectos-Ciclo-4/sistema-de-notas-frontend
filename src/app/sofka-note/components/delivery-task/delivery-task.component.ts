import { Component, OnInit } from '@angular/core';
import { CourseModel } from '../../interfaces/course.model';
import { ApiServiceService } from '../../services/api-service.service';
import { TopicModel } from '../../interfaces/topic.model';
import { SweetalertService } from '../../../shared/service/sweetalert.service';
import { getDownloadURL } from '@angular/fire/storage';
import * as moment from 'moment';

import { v4 as uuidv4, v4 } from 'uuid';
import { Auth } from '@angular/fire/auth';
import { CourseGeneric } from '../../interfaces/courseGeneric';
import { HomeworkStatusModel } from '../../interfaces/homeworkStatus.model';
import { HttpClient } from '@angular/common/http';

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
  homeworkStatus: HomeworkStatusModel[] = [];
  file: any;
  idDelivery: string = '';
  validExtension: string[] = ['pdf', 'docx', 'pptx', 'txt', 'xlsx'];
  date: string = '';
  showLoading: boolean = false;

  constructor(
    private api$: ApiServiceService,
    private swal$: SweetalertService,
    private auth$: Auth,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    setInterval(() => {
      this.date = moment().format('DD/MM/YYYY HH: mm: ss');
    }, 1000);
  }

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
    if (this.course.estadosTarea.length > 0) {
      let set = new Set(
        this.course.estadosTarea.map(({ temaNombre: titulo, temaID }) =>
          JSON.stringify({ titulo, temaID })
        )
      );
      this.topics = Array.from(set).map((ele) => JSON.parse(ele));
    }
  }

  clearFilter() {
    this.topics = [];
    this.course = null;
    this.termSearch = '';
    this.topics = [];
    this.topic = null;
    this.homeworkStatus = [];
  }
  onUpload(event: any) {
 
    const { name } = event.target.files[0];
    const extension = name.split('.').pop().toLowerCase().trim();
    if (this.validExtension.includes(extension)) {
      this.file = event.target.files[0];
      return;
    }
    this.file = null;
    this.swal$.errorMessage(
      'Extensión invalida',
      `Las extensiones permitidas son: ${this.validExtension}`
    );
  }

  saveFile(delivery: HomeworkStatusModel) {
    //TODO: VALIDAR SI EL USUARIO YA ENTREGO EL ARCHIVO
    console.log(delivery);
    const nameFile = `${v4()}.${this.file.name.split('.').pop()}`;
    const title = 'Estas seguro de realizar la entrega?';
    const text = 'Una vez envia no se podra revertir';
    const btnMessage = 'Si, enviar';
    this.swal$.confirmationPopup(title, text, btnMessage).then((result) => {
      if (result.isConfirmed) {
        this.showLoading = true;
        this.api$
          .uploapFile(
            this.file,
            this.course?.nombreCurso!,
            this.topic?.titulo!,
            delivery.titulo,
            nameFile
          )
          .then(async (res) => {
            getDownloadURL(res.ref).then((url) => {
              this.swal$.succesMessage('Entrega realizada con éxito');
              delivery.urlarchivo = url;
              this.file = null;
              this.showLoading = false;
            });
          });
        this.file = null;
      }
    });
  }

  searchDelivery() {
    this.homeworkStatus = this.course?.estadosTarea
      .filter((task) => task.temaID === this.topic?.temaID)!
      .map((ele, index) => {
        let status = ele.estado;
        if (
          ele.estado.toLocaleLowerCase().trim() != 'entregada' &&
          ele.estado.toLocaleLowerCase().trim() != 'calificada'
        ) {
          const days = moment(ele.fechaLimite).diff(moment(), 'days');
          status =
            days == 0 || days == 1
              ? 'Por vencer'
              : days < 0
              ? 'Vencida'
              : 'Sin entregar';
        }
        return {
          ...ele,
          estado: status,
        };
      })
      .sort((a, b) => a.orden - b.orden)!;
  }

  getDelivery(delivery: HomeworkStatusModel) {
    this.file = null
    this.idDelivery = delivery.tareaID
  }
}
