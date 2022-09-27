import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SweetalertService } from 'src/app/shared/service/sweetalert.service';

@Component({
  selector: 'app-modal-note',
  templateUrl: './modal-note.component.html',
  styleUrls: ['./modal-note.component.scss'],
})
export class ModalNoteComponent implements OnInit {
  @Input() header: string = '';
  @Input() displayModal: boolean = false;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  formCreateCourse!: FormGroup;

  constructor(private swal$: SweetalertService) {}

  ngOnInit(): void {}

  closeModalEmmiter() {
    this.closeModal.emit(false);
    this.formCreateCourse.reset();
  }

  submitForm() {
    const title = '¿Estás seguro de agregar la calificación a la tarea?';
    const message =
      'Una vez guardado el registro no se podrá modificar la calificación';
    const btnMessage = 'Agregar';
    this.swal$.confirmationPopup(title, message, btnMessage).then((result) => {
      if (result.isConfirmed) {
        this.swal$.succesMessage('Curso creado con éxito');
        this.closeModalEmmiter();
      }
    });
  }
}
