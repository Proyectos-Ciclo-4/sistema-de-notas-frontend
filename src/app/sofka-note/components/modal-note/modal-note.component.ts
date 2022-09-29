import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SweetalertService } from '../../../shared/service/sweetalert.service';
import { HomeworkStatusModel } from '../../interfaces/homeworkStatus.model';
import { ApiServiceService } from '../../services/api-service.service';
import { GradeCommand } from '../../interfaces/commands/gradeCommand';

@Component({
  selector: 'app-modal-note',
  templateUrl: './modal-note.component.html',
  styleUrls: ['./modal-note.component.scss'],
})
export class ModalNoteComponent implements OnInit {
  @Input() header: string = '';
  @Input() displayModal: boolean = false;
  @Input() delivery: HomeworkStatusModel | null = null;
  @Input() isView: boolean = false;
  @Input() courseId: string = '';
  @Input() studentId: string = '';
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Output() newDeliver: EventEmitter<HomeworkStatusModel> = new EventEmitter()

  formAddNote!: FormGroup;

  constructor(
    private swal$: SweetalertService,
    private router: Router,
    private api$: ApiServiceService
  ) {
    this.formAddNote = new FormGroup({
      calificacion: new FormControl(this.delivery?.calificacion, [
        Validators.required,
        this.validNote.bind(this),
      ]),
      retroalimentacion: new FormControl(this.delivery?.calificacion, [
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
    this.delivery = null;
  }

  succesGrade(){
    this.newDeliver.emit(this.delivery!)
    this.closeModalEmmiter();
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
        const gradeCommand: GradeCommand = {
          ...this.formAddNote.value,
          cursoID: this.courseId,
          estudianteID: this.studentId,
          tareaID: this.delivery?.tareaID!,
        };
        this.api$.gradeTask(gradeCommand).subscribe({
          next: (res) => {
            console.log(res);
            this.swal$.succesMessage('Calificación agregada con éxito');
            this.delivery!.calificacion! = this.formAddNote.value.calificacion!
            this.delivery!.retroalimentacion! = this.formAddNote.value.retroalimentacion!
            this.succesGrade()
          },
          error: (err) => {
            this.swal$.errorMessage();
            console.log(err);
          },
        });
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
