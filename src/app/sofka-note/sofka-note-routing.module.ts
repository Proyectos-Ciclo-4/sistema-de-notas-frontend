import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { HomeComponent } from './pages/home/home.component';
import { SofkaNoteComponent } from './sofka-note.component';
import { HomeStudentComponent } from './pages/home-student/home-student.component';
import { EstudianteGuard } from './guards/estudiante.guard';
import { ProfesorGuard } from './guards/profesor.guard';

const routes: Routes = [
  {
    path: '',
    component: SofkaNoteComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/sofkau-note/home',
      },
      {
        path: 'home',
        pathMatch: 'full',
        component: HomeComponent,
        canActivate: [ProfesorGuard],
      },
      {
        path: 'student',
        pathMatch: 'full',
        component: HomeStudentComponent,
        canActivate: [EstudianteGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SofkaNoteRoutingModule {}
