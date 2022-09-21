import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SweetalertService } from '../../../shared/service/sweetalert.service';
import { Router } from '@angular/router';
import { UserCredential } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(
    private authService: AuthService,
    private swal$: SweetalertService,
    private router: Router
  ) {
    this.formLogin = this.createFormLogin();
  }

  
  ngOnInit(): void {}

  createFormLogin(): FormGroup<any> {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    this.authService
      .login(this.formLogin.value)
      .then((user: UserCredential) => {
        if (user.user.emailVerified) {
          this.swal$
            .succesMessage(`¡Bienvenido ${user.user.displayName!}!`)
            .then(() => {
              this.router.navigate(['/sofkau-note']);
            });
        } else {
          this.authService.logout()
          this.swal$.errorMessage(
            'Aún no has confirmado la cuenta, verifica tu bandeja de correo.'
          );
        }
      })
      .catch((err) => {
        this.swal$.errorMessage("¡Usuario o contraseña incorrecta!");

      });
  }

  resetPassword() {
    this.swal$.resetPassword();
  }
}
