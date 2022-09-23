import { NgModule } from '@angular/core';

// components primeNG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { DividerModule } from 'primeng/divider';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';



@NgModule({
  declarations: [],
  exports: [
    ButtonModule,
    InputTextModule,
    DropdownModule,
    TabViewModule,
    DividerModule,
    DialogModule,
    SlideMenuModule,
    SplitButtonModule,
    ToastModule,
  ],
})
export class PrimeNgModule {}
