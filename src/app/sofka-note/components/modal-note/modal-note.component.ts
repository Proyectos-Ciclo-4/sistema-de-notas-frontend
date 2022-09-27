import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-note',
  templateUrl: './modal-note.component.html',
  styleUrls: ['./modal-note.component.scss'],
})
export class ModalNoteComponent implements OnInit {
  @Input() header: string = '';
  @Input() displayModal: boolean = false;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  formCreateCourse!: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  closeModalEmmiter() {
    this.closeModal.emit(false);
    this.formCreateCourse.reset();
  }
}
