import { NgModule } from '@angular/core';

// components primeNG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [],
  exports: [
    ButtonModule,
    InputTextModule,
    DropdownModule,
    TabViewModule,
    DividerModule,
    DialogModule
  ],
})
export class PrimeNgModule {}
