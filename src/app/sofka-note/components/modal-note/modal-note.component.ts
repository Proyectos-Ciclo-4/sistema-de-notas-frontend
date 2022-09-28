import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SweetalertService } from '../../../shared/service/sweetalert.service';

@Component({
  selector: 'app-modal-note',
  templateUrl: './modal-note.component.html',
  styleUrls: ['./modal-note.component.scss'],
})
export class ModalNoteComponent implements OnInit {
  @Input() header: string = '';
  @Input() displayModal: boolean = false;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  formAddNote!: FormGroup;

  constructor(private swal$: SweetalertService, private router: Router) {
    this.formAddNote = new FormGroup({
      note: new FormControl('', [
        Validators.required,
        this.validNote.bind(this),
      ]),
      feedback: new FormControl('', [
        Validators.required,
        Validators.maxLength(500),
      ]),
    });
    this.formAddNote.reset();
  }

  ngOnInit(): void {}

  closeModalEmmiter() {
    this.closeModal.emit(false);
    this.formAddNote.reset();
  }

  clearData() {
    this.formAddNote.reset();
    this.router.navigate(['/sofkau-note/home']);
  }

  submitForm() {
    const title = '¿Estás seguro de agregar la calificación a la tarea?';
    const message =
      'Una vez guardado el registro no se podrá modificar la calificación';
    const btnMessage = 'Agregar';
    this.swal$.confirmationPopup(title, message, btnMessage).then((result) => {
      if (result.isConfirmed) {
        this.swal$.succesMessage('Calificación agregada con éxito');
        this.closeModalEmmiter();
      }
    });
  }

  validNote(control: AbstractControl) {
    const value = control.value || 0;
    return value > 100 || value < 0
      ? { invalidNumber: 'Rango de 0 a 100' }
      : null;
  }
}
