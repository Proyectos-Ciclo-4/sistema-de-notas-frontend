import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SweetalertService } from '../../../shared/service/sweetalert.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss'],
})
export class ModalFormComponent implements OnInit {
  @Input() header: string = '';
  @Input() displayModal: boolean = false;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  formCreateCourse: FormGroup;

  constructor(private swal$: SweetalertService) {
    this.formCreateCourse = new FormGroup({
      title: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  closeModalEmmiter() {
    this.closeModal.emit(false);
    this.formCreateCourse.reset();
  }

  submitForm() {
    
    const title = '¿Estás seguro de crear el curso?';
    const message = 'Una vez guardado el curso no se podrá editar o eliminar';
    const btnMessage = 'Crear';
    this.swal$.confirmationPopup(title, message, btnMessage).then((result) => {
      if (result.isConfirmed) {
        this.swal$.succesMessage('Curso creado con éxito');
        this.closeModalEmmiter()
      }
    });
  }
}
