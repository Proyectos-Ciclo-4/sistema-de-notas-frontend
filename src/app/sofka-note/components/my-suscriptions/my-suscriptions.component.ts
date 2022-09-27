import { Component, OnInit } from '@angular/core';
import { CourseModel } from '../../interfaces/course.model';
import { ApiServiceService } from '../../services/api-service.service';
import { Auth } from '@angular/fire/auth';
import { EnrollCommand } from '../../interfaces/commands/enrollCommand';
import { SweetalertService } from '../../../shared/service/sweetalert.service';
import { StudentModel } from '../../interfaces/student.model';

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
  student: StudentModel | null = null;

  constructor(
    private api$: ApiServiceService,
    private auth$: Auth,
    private swal$: SweetalertService
  ) {}
  ngOnInit(): void {
    this.getStudentView();
  }

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
    const enrollCommand: EnrollCommand = {
      cursoID: this.course?._id!,
      estudianteID: this.auth$.currentUser?.uid!,
      nombreCurso: this.course?.titulo!,
    };
    const isEnrollo = this.student?.inscripciones.find((ele) => ele.cursoID === this.course?._id);
    if (isEnrollo) {
      this.swal$.errorMessage("Ya te encuentras inscrito en este curso")
      return
    }
    this.api$.enrollCourse(enrollCommand).subscribe({
      next: (res) => {
        this.swal$.succesMessage('Inscripción exitosa');
        this.getStudentView();
      },
      error: (err) => {
        this.swal$.errorMessage();
      },
    });
  }

  getStudentView() {
    this.api$.getInscriptions(this.auth$.currentUser?.uid!).subscribe({
      next: (resp) => {
        this.student = resp;
      },
      error: (err) => this.swal$.errorMessage(),
    });
  }
}
