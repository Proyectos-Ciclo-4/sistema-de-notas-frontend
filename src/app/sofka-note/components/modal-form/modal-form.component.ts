import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SweetalertService } from '../../../shared/service/sweetalert.service';
import { ApiServiceService } from '../../services/api-service.service';
import { CourseCommand } from '../../interfaces/commands/courseCommand';
import { Auth } from '@angular/fire/auth';

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
  showLoading: boolean = false;

  constructor(
    private swal$: SweetalertService,
    private api$: ApiServiceService,
    private auth: Auth
  ) {
    this.formCreateCourse = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(200),
      ]),
    });
  }

  ngOnInit(): void {}

  closeModalEmmiter() {
    this.closeModal.emit(false);
    this.formCreateCourse.reset();
  }

  submitCreateCouser() {
    const title = '¿Estás seguro de crear el curso?';
    const message = 'Una vez guardado el curso no se podrá editar o eliminar';
    const btnMessage = 'Crear';
    this.swal$.confirmationPopup(title, message, btnMessage).then((result) => {
      if (result.isConfirmed) {
        this.showLoading = true;
        const courseCommand: CourseCommand = {
          profesorID: this.auth.currentUser?.uid!,
          titulo: this.formCreateCourse.value.title,
          temas: [],
        };

        this.api$.createCourse(courseCommand).subscribe({
          next: () => {
            this.showLoading = false;
            this.swal$.succesMessage('Curso creado con éxito');
            this.closeModalEmmiter();
          },
          error: () => {
            this.showLoading = false;

            this.swal$.errorMessage();
          },
        });
      }
    });
  }
}
