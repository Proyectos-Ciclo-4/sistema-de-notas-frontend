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
import { TreeTableModule } from 'primeng/treetable';
import { TreeModule } from 'primeng/tree';

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
    TreeTableModule,
    TreeModule,
  ],
})
export class PrimeNgModule {}
