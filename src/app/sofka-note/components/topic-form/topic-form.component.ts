import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { CourseModel } from '../../interfaces/course.model';
import { SweetalertService } from '../../../shared/service/sweetalert.service';
import { ApiServiceService } from '../../services/api-service.service';
import { TopicCommand } from '../../interfaces/commands/topicCommand';

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.scss'],
})
export class TopicFormComponent implements OnInit {
  formTopic: FormGroup;
  showLoading: boolean = false;

  @Input('course') course: CourseModel | null = null;

  constructor(
    private swal$: SweetalertService,
    private api$: ApiServiceService
  ) {
    this.formTopic = this.createForm();
  }

  ngOnInit(): void {}

  private createForm() {
    return new FormGroup({
      titulo: new FormControl('', [
        Validators.required,
        Validators.maxLength(200),
      ]),
      orden: new FormControl('', [
        Validators.required,
        this.validateOrder.bind(this),
      ]),
    });
  }
  validateOrder(control: AbstractControl) {
    return control.value <= 50 && control.value >= 1
      ? null
      : { invalidOrder: 'Rango de 1 a 50' };
  }

  createTopic() {
    const title = '¿Estás seguro de crear el tema?';
    const text = '¡No podrás revertir esto!';
    const messageBotton = 'Crear';
    this.swal$.confirmationPopup(title, text, messageBotton).then((result) => {
      if (result.isConfirmed) {
        this.showLoading = true;
        const topicCommand: TopicCommand = {
          ...this.formTopic.value,
          cursoID: this.course?._id,
          tareas: [],
        };
        this.api$.createTopic(topicCommand).subscribe({
          next: (res) => {
            this.showLoading = false;
            console.log(res);
            this.swal$.succesMessage('Tema creado con éxito');
            this.formTopic.reset();
          },
          error: () => {
            this.showLoading = false;

            this.swal$.errorMessage();
          },
        });
      } else {
        this.formTopic.reset();
      }
    });
  }
}
