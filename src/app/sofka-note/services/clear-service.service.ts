import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClearService {

  @Output() clearComponent : EventEmitter<Boolean> = new EventEmitter();

  constructor() { }
}
