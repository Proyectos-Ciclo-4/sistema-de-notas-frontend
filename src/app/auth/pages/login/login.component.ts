import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SweetalertService } from '../../../shared/service/sweetalert.service';
import { Router } from '@angular/router';

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

  createFormLogin(): FormGroup<any> {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    this.authService
      .login(this.formLogin.value)
      .then((res) =>
        this.swal$
          .succesMessage(`Welcome ${res.user.email!}`)
          .then(() => this.router.navigate(['/sofkau-note']))
      )
      .catch((err) => {
        this.swal$.errorMessage(err.code);
        console.log(err);
      });
  }

  ngOnInit(): void {}

  resetPassword() {
    this.swal$.resetPassword();
  }
}
