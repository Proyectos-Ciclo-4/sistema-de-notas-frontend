import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserCredential, sendEmailVerification } from '@angular/fire/auth';
import { SweetalertService } from '../../../shared/service/sweetalert.service';
import { Role, UserModel } from '../../interface/user.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { StudentCommand } from '../../../sofka-note/interfaces/commands/studentCommand';
import { TeacherCommand } from '../../../sofka-note/interfaces/commands/teacherCommand';

import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  formSignup: FormGroup;
  idType: any;
  role: any;
  showLoading: boolean = false;

  constructor(
    private authservice: AuthService,
    private swal$: SweetalertService,
    private router: Router
  ) {
    this.formSignup = this.createFormSignUp();
    this.formSignup.reset();
    this.idType = [
      { name: 'Cédula de ciudadanía', code: 'CC' },
      { name: 'Tarjeta de identidad', code: 'TI' },
      { name: 'Cédula de extranjería', code: 'CE' },
      { name: 'PEP', code: 'PEP' },
    ];
    this.role = [
      { name: 'Profesor', code: 'Profesor' },
      { name: 'Estudiante', code: 'Estudiante' },
    ];
  }

  ngOnInit(): void {}

  createFormSignUp() {
    return new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        this.validateFullName.bind(this),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        this.validateFullName.bind(this),
      ]),
      celPhone: new FormControl('', [
        Validators.required,
        this.validCelPhone.bind(this),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(50),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        this.validatePassword.bind(this),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        this.confirmPassword.bind(this),
      ]),
      idType: new FormControl('', [Validators.required]),
      idNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      role: new FormControl('', [Validators.required]),
    });
  }

  validatePassword(control: AbstractControl) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&+-])([A-Za-z\d$@$!%*?&+-]|[^ ]){8,15}$/;
    return regex.test(control.value)
      ? null
      : {
          validPassword:
            'Mínimo 8 caracteres, 1 letra mayúscula y 1 caracter especial ($,%&)',
        };
  }

  validateFullName(control: AbstractControl) {
    const pattern = new RegExp('^[A-Z ]+$', 'i');
    return pattern.test(control.value)
      ? null
      : {
          fullName:
            'Solo es permitido letras',
        };
  }

  confirmPassword(control: AbstractControl) {
    return this.formSignup?.get('password')?.value == control.value
      ? null
      : {
          invalidPassword: 'Las contraseña no coincide',
        };
  }

  validCelPhone(control: AbstractControl) {
    const value = control.value || 0;
    return value.toString().length > 12 || value < 0
      ? { invalidPhone: 'Telefono invalido' }
      : null;
  }

  clearData() {
    this.formSignup.reset();
    this.router.navigate(['/login']);
  }

  register() {
    const { password, ...user } = this.generateUser();

    const userRegister: UserModel = {
      ...user,
    };
    this.showLoading = true;
    this.authservice
      .register({
        email: userRegister.email,
        password,
      })
      .then((user: UserCredential) => {
        this.authservice.updateUser(
          user.user,
          `${userRegister.name} ${userRegister.lastName}`
        );
        userRegister.uid = user.user.uid;
        sendEmailVerification(user.user)
          .then(() => {
            return this.authservice.createUser(userRegister);
          })
          .then(() => {
            userRegister.uid = user.user.uid;
            userRegister.rol == Role.Estudiante
              ? this.createStudent(userRegister)
              : this.createTeacher(userRegister);
            this.showLoading = false;
            this.authservice.logout();
            Swal.fire(
              `Se envió un email de verificación a ${userRegister.email}`
            ).then(() => {
              this.clearData(), this.router.navigate(['/']);
            });
          });
      })
      .catch((err) => {
        this.showLoading = false;
        this.swal$.errorMessage('El usuario se encuantra registrado');
      });
  }

  createTeacher(user: UserModel) {
    const teacherCommand: TeacherCommand = {
      nombre: `${user.name} ${user.lastName}`,
      profesorID: user.uid!,
    };
    this.authservice.createProfesorCommand(teacherCommand).subscribe({
      next: (res) => {
        console.log('Teacher added');
      },
      error: () => {
        this.swal$.errorMessage();
      },
    });
  }

  createStudent(user: UserModel) {
    const studentComman: StudentCommand = {
      estudianteID: user.uid!,
      nombre: `${user.name} ${user.lastName}`,
    };
    this.authservice.createStudentCommand(studentComman).subscribe({
      next: (res) => {
        console.log('srudent added');
      },
      error: () => {
        this.swal$.errorMessage();
      },
    });
  }

  generateUser(): any {
    const {
      celPhone,
      password,
      role: { code: rol },
      email,
      idNumber,
      idType: { code: idType },
      lastName,
      name,
    } = this.formSignup.value;

    return { celPhone, password, rol, email, idNumber, idType, lastName, name };
  }
}
