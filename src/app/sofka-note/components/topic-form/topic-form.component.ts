import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CourseModel } from '../../interfaces/course.model';
import { SweetalertService } from '../../../shared/service/sweetalert.service';

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.scss'],
})
export class TopicFormComponent implements OnInit {
  formTopic: FormGroup;

  @Input('course') course: CourseModel | null = null;

  constructor(private swal$: SweetalertService) {
    this.formTopic = this.createForm();
  }

  ngOnInit(): void {}

  private createForm() {
    return new FormGroup({
      topic: new FormControl('', [
        Validators.required,
        Validators.maxLength(200),
      ]),
    });
  }

  createTopic() {
    const title = '¿Estas seguro de crear el tema?';
    const text = '¡No podrás revertir esto!';
    const messageBotton = 'Crear';
    this.swal$.confirmationPopup(title, text, messageBotton).then((result) => {
      if (result.isConfirmed) {
        this.swal$.succesMessage('Tema creado con éxito');
      }
    });
  }
}
