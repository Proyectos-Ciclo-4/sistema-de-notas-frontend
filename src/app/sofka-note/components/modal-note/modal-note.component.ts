import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  // tarea!: any;

  constructor(private swal$: SweetalertService) {
    this.formAddNote = new FormGroup({
      title: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  closeModalEmmiter() {
    this.closeModal.emit(false);
    this.formAddNote.reset();
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

  // getTask() {
  //   const task = {
  //     numero: 1,
  //     tareaID: '1',
  //     titulo: 'Tarea # 1',
  //     limite: '27/10/2022',
  //     calificacion: null,
  //     fechaEntregado: '09/10/2022',
  //     URLArchivo: 'https://www.google.com.co/',
  //     estado: true,
  //   };

  //   this.tarea = task;
  // }
}
