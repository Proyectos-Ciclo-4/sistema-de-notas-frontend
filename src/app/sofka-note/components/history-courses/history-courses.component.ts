import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseModel } from '../../interfaces/course.model';
import { ApiServiceService } from '../../services/api-service.service';
import { SweetalertService } from '../../../shared/service/sweetalert.service';
import { TreeNode } from 'primeng/api';
import { TopicModel } from '../../interfaces/topic.model';
import { Auth } from '@angular/fire/auth';
import { DeleteTaskCommand } from '../../interfaces/commands/deleteTaskCommand';
import { ClearService } from '../../services/clear-service.service';
import { TaskModel } from '../../interfaces/task.model';

@Component({
  selector: 'app-history-courses',
  templateUrl: './history-courses.component.html',
  styleUrls: ['./history-courses.component.scss'],
  styles: [],
})
export class HistoryCoursesComponent implements OnInit, OnDestroy {
  showSuggestion: boolean = false;
  course?: CourseModel | null;
  termSearch: string = '';
  courses: CourseModel[] = [];
  showLoading: boolean = false;
  files: TreeNode[] = [];
  topics: TopicModel[] = [];

  constructor(
    private api$: ApiServiceService,
    private swal$: SweetalertService,
    private auth$: Auth,
    private clearComponent: ClearService
  ) {}

  ngOnInit(): void {
    this.clearComponent.clearComponent.subscribe(() => {
      this.course = null;
      this.termSearch = '';
      this.courses = [];
      this.topics = [];
    });
  }
  ngOnDestroy(): void {}

  courseSuggestions(termSearch: string) {
    this.course = null;
    this.termSearch = termSearch;
    this.showSuggestion = true;
    this.files = [];
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
    this.topics = this.course.temas;
  }

  deleteItem(item: TaskModel) {
    const deleteTaskCommand: DeleteTaskCommand = {
      cursoID: item.cursoID,
      temaID: item.temaID,
      tareaID: item._id,
    };
    let title = '';
    let text = 'Una vez eliminado no se podrá revertir';
    let btnMessage = 'Si, eliminar';
    this.swal$.confirmationPopup(title, text, btnMessage).then((result) => {
      if (result.isConfirmed) {
        this.showLoading = true;
        this.api$.deleteTask(deleteTaskCommand).subscribe({
          next: (res) => {
            this.swal$.succesMessage('Item eliminado correctamente');
            this.topics = this.topics.map((topic) => {
              return {
                ...topic,
                tareas: topic.tareas?.filter((task) => task._id != item._id),
              };
            });
            this.showLoading = false;
          },
          error: (err) => {
            this.swal$.errorMessage();
            this.showLoading = false;
          },
        });
      }
    });
  }
}
