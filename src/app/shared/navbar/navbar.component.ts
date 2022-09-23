import { Component, OnInit } from '@angular/core';

import { UserModel } from 'src/app/auth/interface/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';

import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { SweetalertService } from '../service/sweetalert.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentLogin!: UserModel;
  items!: MenuItem[];

  constructor(
    private authservice: AuthService,
    private router: Router,
    private swal$: SweetalertService
  ) {}

  ngOnInit(): void {
    this.authservice.currentUser().subscribe((user) => {
      this.currentLogin = user[0];
    });

    this.items = [
      {
        label: 'Logout',
        icon: 'pi pi-power-off',
        command: () => {
          this.logout();
        },
      },
    ];
  }

  logout() {
    const title = 'Estas seguro de salir?';
    const text = 'Para ingresar deberás iniciar sesión nuevamente!';
    const btnMessage = 'Si, salir';
    this.swal$.confirmationPopup(title, text, btnMessage).then((result) => {
      if (result.isConfirmed) {
        this.swal$.succesMessage('Sesión cerrada exitosamente');
        this.authservice.logout().then(() => {
          this.router.navigate(['/']);
        });
      }
    });
  }
}
