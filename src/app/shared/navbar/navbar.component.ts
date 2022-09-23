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
  styles: [
    `
      :host ::ng-deep .ui-slidemenu {
        width: 13.5em;
      }
    `,
  ],
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
      { label: 'Perfil', icon: 'pi pi-user-edit' },
      { label: 'Configuración', icon: 'pi pi-pencil' },
      { separator: true },
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
    this.authservice.logout().then(() => {
      this.swal$.succesMessage('Sesión cerrada correctamente').then(() => {
        this.router.navigate(['/auth/login']);
      });
    });
  }
}
