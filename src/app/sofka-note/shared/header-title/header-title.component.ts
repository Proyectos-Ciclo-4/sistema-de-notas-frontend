import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header-title',
  templateUrl: './header-title.component.html',
  styleUrls: ['./header-title.component.scss'],
})
export class HeaderTitleComponent implements OnInit {
  @Input('title') title: string = '';
  @Input('show') show: boolean = false;
  @Output() showAccordion: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  showAccordionEmiter() {
    this.showAccordion.emit(!this.show);
  }
}
