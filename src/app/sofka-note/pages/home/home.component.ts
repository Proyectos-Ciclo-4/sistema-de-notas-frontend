import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { CourseModel } from '../../interfaces/course.model';
import { Auth } from '@angular/fire/auth';
import { ClearService } from '../../services/clear-service.service';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  headerStyle: any;
  course?: CourseModel | null;
  termSearch: string = '';
  courses: CourseModel[] = [];
  showSuggestion: boolean = false;
  showDialog: boolean = false;
  showTask: boolean = false;
  showCreateCourse: boolean = true;

  constructor(
    private api$: ApiServiceService,
    private auth$: Auth,
    private clearComponent$: ClearService,
    private webSocket$: WebSocketService
  ) {
    this.headerStyle = {
      display: 'flex',
      justifyContent: 'center',
      width: '33.33%',
      fontWeight: 'bold',
    };
  }

  ngOnInit(): void {
    this.webSocket$.conect(this.auth$.currentUser?.uid!).subscribe((event) => {
      console.log(event);
    });
  }

  searchCourse(termSearch: string) {
    // this.courses = this.api$.searchCourse(termSearch);
  }

  courseSuggestions(termSearch: string) {
    this.ngOnInit;
    this.course = null;
    this.termSearch = termSearch;
    this.showSuggestion = true;
    if (termSearch != '') {
      this.api$
        .searchCourse(termSearch, this.auth$.currentUser?.uid!)
        .subscribe({
          next: (res) => {
            this.courses = res;
          },
        });
    } else {
      this.courses = [];
    }
  }

  selectCourse(course: CourseModel) {
    this.termSearch = course.titulo;
    this.course = course;
    this.courses = [];
    this.showSuggestion = false;
  }

  createCourse() {
    this.showDialog = true;
  }

  closeModal(event: boolean) {
    this.showDialog = event;
  }

  showAccordion(show: boolean) {
    this.showCreateCourse = !this.showCreateCourse;
    this.showTask = !this.showTask;
  }

  clearComponent(event: any) {
    this.course = null;
    this.termSearch = '';
    this.courses = [];
    this.clearComponent$.clearComponent.emit(
      !this.clearComponent$.clearComponent
    );
  }
}
