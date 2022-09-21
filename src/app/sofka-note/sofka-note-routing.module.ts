import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { HomeComponent } from './pages/home/home.component';
import { SofkaNoteComponent } from './sofka-note.component';


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
