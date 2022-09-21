import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    ...canActivate(() => redirectLoggedInTo(['/sofkau-note'])),
  },
  {
    path: 'sofkau-note',
    loadChildren: () =>
      import('./sofka-note/sofka-note.module').then((m) => m.SofkaNoteModule),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: '**',
    redirectTo: "/login",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
