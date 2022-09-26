import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [HeaderComponent, NavbarComponent, LoadingComponent],
  imports: [CommonModule, PrimeNgModule],
  exports: [HeaderComponent, NavbarComponent,RouterModule,LoadingComponent],
})
export class SharedModule {}
