import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// components
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';

@NgModule({
  declarations: [HeaderComponent, NavbarComponent],
  imports: [CommonModule, FontAwesomeModule, PrimeNgModule],
  exports: [HeaderComponent, NavbarComponent],
})
export class SharedModule {}
