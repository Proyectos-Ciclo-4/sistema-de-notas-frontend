import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { CourseModel } from '../../interfaces/course.model';
import { Auth } from '@angular/fire/auth';

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

  constructor(private api$: ApiServiceService, private auth$: Auth) {
    this.headerStyle = {
      display: 'flex',
      justifyContent: 'center',
      width: '33.33%',
      fontWeight: 'bold',
    };
  }

  ngOnInit(): void {}

  searchCourse(termSearch: string) {
    // this.courses = this.api$.searchCourse(termSearch);
  }

  courseSuggestions(termSearch: string) {
    this.ngOnInit
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

  clearComponent() {
    this.course = null;
    this.termSearch = '';
    this.courses = [];
    this.showCreateCourse = true;
  }

}
