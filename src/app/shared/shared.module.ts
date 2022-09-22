import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FontAwesomeModule
} from '@fortawesome/angular-fontawesome';

// components
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [HeaderComponent, NavbarComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [HeaderComponent, NavbarComponent],
})
export class SharedModule {}
