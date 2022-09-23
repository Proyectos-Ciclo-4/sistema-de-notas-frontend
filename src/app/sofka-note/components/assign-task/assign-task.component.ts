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

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.scss'],
})
export class AssignTaskComponent implements OnInit {
  topics: TopicModel[] = [];
  topic: TopicModel | null = null;
  formTopic: FormGroup;
  today: any = moment().format('YYYY-MM-DD');
  showSuggestion: boolean = false;
  course?: CourseModel | null;
  termSearch: string = '';
  courses: CourseModel[] = [];
  constructor(
    private api$: ApiServiceService,
    private swal$: SweetalertService
  ) {
    this.formTopic = this.createFormGroup();
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
      fecha: new FormControl(this.today, [Validators.required]),
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
        this.swal$.succesMessage('Tarea creado con éxito');
        this.formTopic.reset();
        this.topic = null;
        this.course = null;
        this.termSearch = '';
        this.topics = [];
        this.formTopic.value['fecha'] = this.today
        
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
      this.courses = this.api$.searchCourse(termSearch);
    } else {
      this.courses = [];
    }
  }

  validateOrder(control: AbstractControl) {
    return control.value <= 50 && control.value >= 1
      ? null
      : { invalidOrder: 'Rango de 1 a 50' };
  }
  selectCourse(course: CourseModel) {
    this.termSearch = course.titulo;
    this.course = course;
    this.courses = [];
    this.showSuggestion = false;
    this.topics = this.api$.getTopic(this.course.cursoID);
  }
}
