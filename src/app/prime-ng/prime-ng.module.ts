import { NgModule } from '@angular/core';


// components primeNG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
  declarations: [],
  exports: [ButtonModule, InputTextModule, DropdownModule],
})
export class PrimeNgModule {}
