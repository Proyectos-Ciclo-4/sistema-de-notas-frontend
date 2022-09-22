import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SofkaNoteRoutingModule } from './sofka-note-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { SofkaNoteComponent } from './sofka-note.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { HeaderTitleComponent } from './shared/header-title/header-title.component';

@NgModule({
  declarations: [
    HomeComponent,
    SofkaNoteComponent,
    SearchInputComponent,
    HeaderTitleComponent,
  ],
  imports: [
    CommonModule,
    SofkaNoteRoutingModule,
    SharedModule,
    FormsModule,
    PrimeNgModule,
  ],
})
export class SofkaNoteModule {}
