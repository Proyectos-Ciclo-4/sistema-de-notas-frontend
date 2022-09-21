import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SofkaNoteRoutingModule } from './sofka-note-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { SofkaNoteComponent } from './sofka-note.component';

@NgModule({
  declarations: [
    HomeComponent,SofkaNoteComponent
  ],
  imports: [CommonModule, SofkaNoteRoutingModule,SharedModule],
})
export class SofkaNoteModule {}
