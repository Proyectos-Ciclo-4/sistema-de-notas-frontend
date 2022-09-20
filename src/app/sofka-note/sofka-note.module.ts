import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SofkaNoteRoutingModule } from './sofka-note-routing.module';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [CommonModule, SofkaNoteRoutingModule],
})
export class SofkaNoteModule {}
