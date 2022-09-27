import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-note',
  templateUrl: './modal-note.component.html',
  styleUrls: ['./modal-note.component.scss'],
})
export class ModalNoteComponent implements OnInit {
  @Input() header: string = '';
  @Input() displayModal: boolean = false;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
