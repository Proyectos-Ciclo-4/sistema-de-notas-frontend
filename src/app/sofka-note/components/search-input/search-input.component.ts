import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit {
  
  // term: string = ''
  @Output() onDebunce: EventEmitter<string> = new EventEmitter();
  @Output() onEnter: EventEmitter<string> = new EventEmitter();

  @Input() placeHolder: string = 'generic';
  @Input() term: string = ''

  deBouncer: Subject<string> = new Subject();

  constructor() {}

  ngOnInit(): void {
    /**
     * pipe: hacer algo ante de suscribirse
     * debonceTime emite el valor luego de que no se detecte escritura entre 300 mili
     * emit: emite el valor a otros componentes
     */
    this.deBouncer.pipe(debounceTime(300)).subscribe((valor) => {
      this.onDebunce.emit(valor);
    });
  }

  search(event: Event) {
    this.onEnter.emit(this.term);
    
  }

  pressKey(event: any) {
    //emite el valor asignado al copiar en el input
    this.deBouncer.next(this.term);
  }
}
