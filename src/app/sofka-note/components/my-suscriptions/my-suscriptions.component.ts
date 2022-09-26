import { Component, OnInit } from '@angular/core';
import { CourseModel } from '../../interfaces/course.model';
import { ApiServiceService } from '../../services/api-service.service';
import { Auth } from '@angular/fire/auth';
import { EnrollCommand } from '../../interfaces/commands/enrollCommand';
import { SweetalertService } from '../../../shared/service/sweetalert.service';

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

  constructor(
    private api$: ApiServiceService,
    private auth$: Auth,
    private swal$: SweetalertService
  ) {}
  ngOnInit(): void {}

  courseSuggestions(termSearch: string) {
    this.course = null;
    this.termSearch = termSearch;
    if (termSearch != '') {
      this.showSuggestion = true;
      this.api$.searchAllCourse(termSearch).subscribe({
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

  clearFilter() {
    this.course = null;
    this.termSearch = '';
  }

  enrollCourse() {
    const enrollComan: EnrollCommand = {
      cursoId: this.course?._id!,
      estudianteID: this.auth$.currentUser?.uid!,
    };

    this.api$.enrollCourse(enrollComan).subscribe({
      next: (res) => {
        this.swal$.succesMessage('Inscripción exitosa');
      },
      error: (err) =>{
        debugger
        this.swal$.errorMessage()},
    });
  }
}
