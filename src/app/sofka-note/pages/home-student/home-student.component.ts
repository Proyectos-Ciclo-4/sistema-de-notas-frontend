import { Component, OnInit } from '@angular/core';
import { ClearService } from '../../services/clear-service.service';
import { WebSocketService } from '../../services/web-socket.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.component.html',
  styleUrls: ['./home-student.component.scss'],
})
export class HomeStudentComponent implements OnInit {
  headerStyle: any;
  constructor(
    private clearComponent$: ClearService,
    private webSocket$: WebSocketService,
    private auth$: Auth
  ) {
    this.headerStyle = {
      display: 'flex',
      justifyContent: 'center',
      width: '50%',
      fontWeight: 'bold',
    };
  }

  ngOnInit(): void {
    this.webSocket$
      .conect(this.auth$.currentUser?.uid!, 'vistaEstudiante')
      .subscribe((event) => {
      });
  }

  clearComponent(event: any) {
    this.clearComponent$.clearComponent.emit(
      !this.clearComponent$.clearComponent
    );
  }
}
