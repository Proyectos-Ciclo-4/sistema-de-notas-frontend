import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { TopicModel } from '../../interfaces/topic.model';
import { SweetalertService } from '../../../shared/service/sweetalert.service';
import { getDownloadURL } from '@angular/fire/storage';
import * as moment from 'moment';

import { Auth } from '@angular/fire/auth';
import { CourseGeneric } from '../../interfaces/courseGeneric';
import { HomeworkStatusModel } from '../../interfaces/homeworkStatus.model';
import { Status } from '../../enum/status.enum';
import { DeliveryCommand } from '../../interfaces/commands/deliveryCommand';
import { ClearService } from '../../services/clear-service.service';

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
  deliveries: HomeworkStatusModel[] = [];
  file: any;
  idDelivery: string = '';
  validExtension: string[] = ['pdf', 'docx', 'pptx', 'txt', 'xlsx'];
  date: string = '';
  showLoading: boolean = false;
  moment = moment;
  delivery: HomeworkStatusModel | null = null;
  showModal: boolean = false;
  compliance: number = 0;

  constructor(
    private api$: ApiServiceService,
    private swal$: SweetalertService,
    private auth$: Auth,
    private clearComponent$: ClearService
  ) {}

  ngOnInit(): void {
    setInterval(() => {
      this.date = moment().format('DD/MM/YYYY HH: mm: ss');
    }, 1000);
    this.clearComponent$.clearComponent.subscribe(() => {
      this.course = null;
      this.courses = [];
      this.termSearch = '';
      this.showSuggestion = false;
      this.topics = [];
      this.topic = null;
      this.deliveries = [];
      this.file = null;
      this.idDelivery = '';
      this.showLoading = false;
      this.delivery = null;
    });
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
    this.compliance = this.course.promedio;
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
    this.deliveries = [];
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
    const nameFile = `${
      this.auth$.currentUser?.uid + delivery.tareaID
    }.${this.file.name.split('.').pop()}`;
    const title = '¿Estás seguro de realizar la entrega?';
    const text = 'Una vez calificada no será posible cambiar la entrega';
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
              delivery.archivoURL = url;
              this.deliverHomework(delivery, url);
            });
          });
        this.file = null;
      }
    });
  }

  searchDelivery() {
    this.deliveries = this.course?.estadosTarea
      .filter((task) => task.temaID === this.topic?.temaID)!
      .map((ele, index) => {
        let status = ele.estado;
        if (
          ele.estado != Status.ENTREGADA &&
          ele.estado.trim() != Status.CALIFICADA
        ) {
          const days = moment(ele.fechaLimite).diff(moment(), 'days');
          status =
            days == 0 || days == 1
              ? Status.POR_VENCER
              : days < 0
              ? Status.VENCIDA
              : Status.SIN_ENTREGAR;
        }
        return {
          ...ele,
          estado: status,
        };
      })
      .sort((a, b) => a.orden - b.orden)!;
  }

  deliverHomework(delivery: HomeworkStatusModel, url: string) {
    const deliverycommand: DeliveryCommand = {
      archivoURL: url,
      tareaID: delivery.tareaID,
      cursoID: this.course?.cursoID!,
      estudianteID: this.auth$.currentUser?.uid!,
    };
    this.api$.deliverHomework(deliverycommand).subscribe({
      next: (resp) => {
        this.swal$.succesMessage('Entrega realizada con éxito');
        this.file = null;
        this.showLoading = false;
        delivery.estado = this.getStatus().ENTREGADA;
        delivery.fechaEntregado = moment().format('YYYY-MM-DD');
        this.compliance =
          (this.deliveries.filter((d) => d.estado == this.getStatus().ENTREGADA)
            .length /
            this.deliveries.length) *
          100;
      },
      error: (err) => {
        this.swal$.errorMessage();
        this.showLoading = false;
      },
    });
  }

  getDelivery(delivery: HomeworkStatusModel) {
    this.file = null;
    this.idDelivery = delivery.tareaID;
  }

  getStatus() {
    return Status;
  }

  closeModal(event: any) {
    this.showModal = event;
    this.delivery = null;
  }

  showDetails(delivery: HomeworkStatusModel) {
    this.showModal = true;
    this.delivery = delivery;
  }
}
