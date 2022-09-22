import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.scss'],
})
export class TopicFormComponent implements OnInit {
  formTopic: FormGroup;

  @Input('course') course: any;

  constructor() {
    this.formTopic = this.createForm();
  }

  ngOnInit(): void {}

  private createForm() {
    return new FormGroup({
      topic: new FormControl('', [Validators.required,Validators.maxLength(200)]),
    });
  }

  createTopic() {
    console.log(this.formTopic);
  }
}
