import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.component.html',
  styleUrls: ['./home-student.component.scss'],
})
export class HomeStudentComponent implements OnInit {
  headerStyle: any;
  constructor() {
    this.headerStyle = {
      display: 'flex',
      justifyContent: 'center',
      width: '50%',
      fontWeight: 'bold',
    };
  }

  ngOnInit(): void {}
}
