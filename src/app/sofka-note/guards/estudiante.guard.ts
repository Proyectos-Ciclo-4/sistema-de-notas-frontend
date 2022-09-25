import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Role, UserModel } from 'src/app/auth/interface/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class EstudianteGuard implements CanActivate {
  currentLogin!: UserModel;
  estudiante: Role = Role.Estudiante;

  constructor(private authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Código de verificación de rol
    this.authService.currentUser().subscribe((user) => {
      this.currentLogin = user[0];
    });

    return this.currentLogin.rol == this.estudiante ? true : false;
  }
}
