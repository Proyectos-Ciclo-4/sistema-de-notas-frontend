import { Component, OnInit } from '@angular/core';
import { ClearService } from '../../services/clear-service.service';

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.component.html',
  styleUrls: ['./home-student.component.scss'],
})
export class HomeStudentComponent implements OnInit {
  headerStyle: any;
  constructor(private clearComponent$: ClearService) {
    this.headerStyle = {
      display: 'flex',
      justifyContent: 'center',
      width: '50%',
      fontWeight: 'bold',
    };
  }

  ngOnInit(): void {}

  clearComponent(event: any) {
    this.clearComponent$.clearComponent.emit(
      !this.clearComponent$.clearComponent
    );
  }
}
