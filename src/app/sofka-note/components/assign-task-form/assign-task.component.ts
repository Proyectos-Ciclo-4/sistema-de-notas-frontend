import { Component, OnInit } from '@angular/core';
import { TopicModel } from '../../interfaces/topic.model';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import { CourseModel } from '../../interfaces/course.model';
import { ApiServiceService } from '../../services/api-service.service';
import { SweetalertService } from '../../../shared/service/sweetalert.service';
import { TaskCommand } from '../../interfaces/commands/taskCommand';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.scss'],
})
export class AssignTaskComponent implements OnInit {
  topics: TopicModel[] = [];
  topic: TopicModel | null = null;
  formTopic: FormGroup;
  today: any;
  dateSelect: any;
  showSuggestion: boolean = false;
  course?: CourseModel | null;
  termSearch: string = '';
  courses: CourseModel[] = [];
  showLoading: boolean = false;
  constructor(
    private api$: ApiServiceService,
    private swal$: SweetalertService,
    private auth$: Auth
  ) {
    this.formTopic = this.createFormGroup();
    this.today = moment().format('YYYY-MM-DD');
    this.dateSelect = this.today;
  }

  ngOnInit(): void {}

  createFormGroup(): FormGroup {
    return new FormGroup({
      titulo: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      orden: new FormControl('', [
        Validators.required,
        this.validateOrder.bind(this),
      ]),
      fechaLimite: new FormControl(this.today, [
        Validators.required,
        this.validateDate.bind(this),
      ]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.maxLength(500),
      ]),
    });
  }

  submitForm() {
    const title = '¿Estás seguro de crear la tarea?';
    const message = 'Una vez guardada la tarea no se podrá editar o eliminar';
    const btnMessage = 'Crear';
    this.swal$.confirmationPopup(title, message, btnMessage).then((result) => {
      if (result.isConfirmed) {
        this.showLoading = true;
        const taskCommand: TaskCommand = {
          cursoID: this.course?._id,
          temaID: this.topic?.temaID!,
          ...this.formTopic.value,
          fechaLimite: moment(this.formTopic.value.fechaLimite).format(
            'DD/MM/YYYY'
          ),
          temaNombre: this.topic?.titulo,
          porcentaje: 0,
        };
        this.api$.createTask(taskCommand).subscribe({
          next: (res) => {
            this.showLoading = false;
            this.swal$.succesMessage('Tarea creado con éxito');
            this.formTopic.reset();
            this.formTopic.value['fecha'] = this.today;
          },
          error: () => {
            this.showLoading = false;
            this.swal$.errorMessage();
          },
        });
      }
    });
  }

  courseSuggestions(termSearch: string) {
    this.topic = null;
    this.course = null;
    this.termSearch = termSearch;
    this.topics = [];
    this.showSuggestion = true;
    if (termSearch != '') {
      this.api$
        .searchCourse(termSearch, this.auth$.currentUser?.uid!)
        .subscribe({
          next: (resp) => {
            this.courses = resp;
          },
        });
    } else {
      this.courses = [];
    }
  }

  validateOrder(control: AbstractControl) {
    return control.value <= 50 && control.value >= 1
      ? null
      : { invalidOrder: 'Rango de 1 a 50' };
  }

  validateDate(control: AbstractControl) {
    return moment(control.value).diff(this.today, 'days') < 0
      ? {
          errorDate: `Fecha no puede ser menor a ${moment(this.today).format(
            'DD/MM/YYYY'
          )}`,
        }
      : null;
  }

  selectCourse(course: CourseModel) {
    this.termSearch = course.titulo;
    this.course = course;
    this.courses = [];
    this.showSuggestion = false;
    this.topics = this.course.temas;
  }

  clearForm() {
    this.formTopic.reset();
    this.topic = null;
    this.course = null;
    this.termSearch = '';
    this.topics = [];
  }
}
