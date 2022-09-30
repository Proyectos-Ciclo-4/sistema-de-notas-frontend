import { Component, OnInit } from '@angular/core';
import { CourseModel } from '../../interfaces/course.model';
import { ApiServiceService } from '../../services/api-service.service';
import { Auth } from '@angular/fire/auth';
import { SweetalertService } from '../../../shared/service/sweetalert.service';
import * as moment from 'moment';
import { Status } from '../../enum/status.enum';
import { HomeComponent } from '../../pages/home/home.component';
import { HomeworkStatusModel } from '../../interfaces/homeworkStatus.model';
import { ClearService } from '../../services/clear-service.service';

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
  studentsCourse: any[] = [];
  showDialog: boolean = false;
  showLoading: boolean = false;
  date: string = '';
  moment = moment;
  delivery: HomeworkStatusModel | null = null;
  studentId: string = '';
  compliance: number = 0;

  constructor(
    private api$: ApiServiceService,
    private auth$: Auth,
    private swal$: SweetalertService,
    private clearComponent$: ClearService
  ) {}

  ngOnInit(): void {
    setInterval(() => {
      this.date = moment().format('DD/MM/YYYY HH: mm: ss');
    }, 1000);
    this.clearComponent$.clearComponent.subscribe(() => {
      this.course = null;
      this.termSearch = '';
      this.courses = [];
      this.studentsCourse = [];
      this.delivery = null;
      this.studentId = '';
    });
  }

  selectCourse(course: CourseModel) {
    this.termSearch = course.titulo;
    this.course = course;
    this.courses = [];
    this.showSuggestion = false;
  }

  courseSuggestions(termSearch: string) {
    this.course = null;
    this.termSearch = termSearch;
    this.studentsCourse = [];
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
    this.termSearch = '';
    this.course = null;
    this.courses = [];
    this.studentsCourse = [];
  }

  //Event close modal
  closeModal(event: boolean) {
    this.showDialog = event;
  }

  successGrade(event: HomeworkStatusModel) {
    this.delivery = event;
    this.getStudentsCourse();
  }

  AddNote(delivery: HomeworkStatusModel) {
    this.delivery = delivery;
    this.showDialog = true;
  }

  getStudentsCourse() {
    this.showLoading = true;
    this.api$.getStudentByCourseId(this.course?._id!).subscribe({
      next: (resp) => {
        debugger;
        this.compliance = resp[0].inscripciones[0].promedio
        this.studentsCourse = resp.map(
          ({ _id, nombre, avance, inscripciones }) => {
            return {
              _id,
              nombre,
              avance,
              estadosTarea: inscripciones.flatMap((e) => e.estadosTarea),
            };
          }
        );
        this.showLoading = false;
      },
      error: (err) => {
        this.swal$.errorMessage();
        this.showLoading = false;
      },
    });
  }

  getStatus() {
    return Status;
  }

  getStudentId(studenId: string) {
    console.log(studenId);
    this.studentId = studenId;
  }
}
