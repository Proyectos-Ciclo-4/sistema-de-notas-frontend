import { Component, OnInit } from '@angular/core';
import { CourseModel } from '../../interfaces/course.model';
import { ApiServiceService } from '../../services/api-service.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-table-students',
  templateUrl: './table-students.component.html',
  styleUrls: ['./table-students.component.scss'],
})
export class TableStudentsComponent implements OnInit {
  showSuggestion: boolean = false;
  course?: CourseModel | null;
  termSearch: string = '';
  courses: CourseModel[] = [];
  constructor(private api$: ApiServiceService, private auth$: Auth) {}

  ngOnInit(): void {}

  selectCourse(course: CourseModel) {
    this.termSearch = course.titulo;
    this.course = course;
    this.courses = [];
    this.showSuggestion = false;
  }
  courseSuggestions(termSearch: string) {
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

  clearFilter() {
    (this.termSearch = ''), (this.course = null);
    this.courses = [];
  }
}
