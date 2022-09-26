import { Component, OnInit } from '@angular/core';
import { CourseModel } from '../../interfaces/course.model';
import { ApiServiceService } from '../../services/api-service.service';
import { UserModel } from '../../../auth/interface/user.model';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-my-suscriptions',
  templateUrl: './my-suscriptions.component.html',
  styleUrls: ['./my-suscriptions.component.scss'],
})
export class MySuscriptionsComponent implements OnInit {
  course: CourseModel | null = null;
  courses: CourseModel[] = [];
  termSearch: string = '';
  showSuggestion: boolean = false;
  suscriptions: any[] = [];
  user: any;

  constructor(private api$: ApiServiceService, private auth$: AuthService) {}
  ngOnInit(): void {
    //TODO: PENDIENTE USUARIO
    this.user = { uid: '123' };
  }

  courseSuggestions(termSearch: string) {
    this.course = null;
    this.termSearch = termSearch;
    this.showSuggestion = true;

    if (termSearch != '') {
      this.courses = this.api$.searchCourse(termSearch);
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

  clearFilter() {
    this.course = null;
    this.termSearch = '';
  }

  searchMySuscription() {
    this.suscriptions = this.api$.getInscriptions(
      this.user.uid,
      this.course?._id!
    );
  }
}