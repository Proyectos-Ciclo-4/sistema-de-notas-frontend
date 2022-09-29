import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseModel } from '../../interfaces/course.model';
import { ApiServiceService } from '../../services/api-service.service';
import { SweetalertService } from '../../../shared/service/sweetalert.service';
import { TreeNode } from 'primeng/api';
import { TopicModel } from '../../interfaces/topic.model';
import { Auth } from '@angular/fire/auth';
import { DeleteTaskCommand } from '../../interfaces/commands/deleteTaskCommand';
import { ClearService } from '../../services/clear-service.service';

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

  cols: any[] = [];
  constructor(
    private api$: ApiServiceService,
    private swal$: SweetalertService,
    private auth$: Auth,
    private clearComponent: ClearService
  ) {}
  ngOnInit(): void {
    this.cols = [
      { field: 'titulo', header: 'Tema' },
      { field: 'tarea', header: 'Tarea' },
    ];
    this.clearComponent.clearComponent.subscribe(() => {
      this.course = null;
      this.termSearch = '';
      this.courses = [];
      this.files = [];
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
    this.files = this.generateTreeNode(this.course.temas);
  }

  generateTreeNode(topics: TopicModel[]): TreeNode[] {
    this.showLoading = true;
    const createNode = topics.map(
      ({ temaID, titulo, cursoID, orden, tareas }: TopicModel) => {
        let children: any = [];
        if (tareas!?.length > 0) {
          children = [
            {
              data: {
                titulo: 'Tareas',
                tarea: '',
                porcentaje: '',
                temaID,
                cursoID,
                orden,
                type: 'delete.all.task',
                showActions: false,
              },
              children: [
                ...tareas!.map((tarea) => ({
                  data: {
                    titulo: '',
                    tarea: tarea.titulo,
                    porcentaje: tarea.porcentaje,
                    temaID,
                    cursoID,
                    orden: '',
                    tareaId: tarea._id,
                    type: 'delete.one.task',
                    showActions: true,
                  },
                })),
              ],
            },
          ];
        }
        return {
          data: {
            titulo: titulo,
            tarea: '',
            porcentaje: '',
            temaID,
            cursoID,
            orden,
            type: 'delete.topic',
            showActions: false,
          },
          children,
        };
      }
    );
    this.showLoading = false;
    return createNode;
  }

  deleteItem(item: any, rowNode: TreeNode) {
    const deleteTaskCommand: DeleteTaskCommand = {
      cursoID: item.cursoID,
      temaID: item.temaID,
      tareaID: item.tareaId,
    };
    let title = '';
    let text = 'Una vez eliminado no se podrá revertir';
    let btnMessage = 'Si, eliminar';

    switch (item.type) {
      case 'delete.topic':
        title = `¿Estás seguro de eliminar el tema?`;
        break;
      case 'delete.all.task':
        title = `¿Estás seguro de eliminar todas las tareas?`;
        break;
      case 'delete.one.task':
        title = `¿Estás seguro de eliminar la tarea?`;
        this.swal$.confirmationPopup(title, text, btnMessage).then((result) => {
          if (result.isConfirmed) {
            this.showLoading = true;
            this.api$.deleteTask(deleteTaskCommand).subscribe({
              next: (res) => {
                this.swal$.succesMessage('Item elimado correctamente');
                this.getCourseById();
              },
              error: (err) => {
                this.swal$.errorMessage();
                this.showLoading = false;
              },
            });
          }
        });
        break;
      default:
        break;
    }
  }

  getCourseById() {
    this.showLoading = true;
    setTimeout(() => {
      this.api$.getCourseById(this.course?._id!).subscribe({
        next: (resp) => {
          this.course = resp;
          this.files = this.generateTreeNode(this.course.temas);
        },
      });
    }, 2000);
  }
}
