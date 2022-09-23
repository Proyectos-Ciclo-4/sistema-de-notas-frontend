import { NgModule } from '@angular/core';

// components primeNG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [],
  exports: [
    ButtonModule,
    InputTextModule,
    DropdownModule,
    SlideMenuModule,
    SplitButtonModule,
    ToastModule,
  ],
})
export class PrimeNgModule {}
