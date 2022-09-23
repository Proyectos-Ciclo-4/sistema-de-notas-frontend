import { NgModule } from '@angular/core';


// components primeNG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {TabViewModule} from 'primeng/tabview';
import {DividerModule} from 'primeng/divider';

@NgModule({
  declarations: [],
  exports: [ButtonModule, InputTextModule, DropdownModule,TabViewModule,DividerModule],
})
export class PrimeNgModule {}
