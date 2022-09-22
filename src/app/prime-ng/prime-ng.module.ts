import { NgModule } from '@angular/core';


// components primeNG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {TabViewModule} from 'primeng/tabview';


@NgModule({
  declarations: [],
  exports: [ButtonModule, InputTextModule, DropdownModule,TabViewModule],
})
export class PrimeNgModule {}
