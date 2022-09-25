import { Component, OnInit } from '@angular/core';
import { CourseModel } from '../../interfaces/course.model';
import { ApiServiceService } from '../../services/api-service.service';
import { SweetalertService } from '../../../shared/service/sweetalert.service';
import { TreeNode } from 'primeng/api';
import { TopicModel } from '../../interfaces/topic.model';

@Component({
  selector: 'app-history-courses',
  templateUrl: './history-courses.component.html',
  styleUrls: ['./history-courses.component.scss'],
})
export class HistoryCoursesComponent implements OnInit {
  showSuggestion: boolean = false;
  course?: CourseModel | null;
  termSearch: string = '';
  courses: CourseModel[] = [];

  files: TreeNode[] = [];

  cols: any[] = [];
  constructor(
    private api$: ApiServiceService,
    private swal$: SweetalertService
  ) {}
  ngOnInit(): void {
    this.cols = [
      { field: 'titulo', header: 'Tema' },
      { field: 'tarea', header: 'Tarea' },
    ];
  }

  courseSuggestions(termSearch: string) {
    this.course = null;
    this.termSearch = termSearch;
    this.showSuggestion = true;
    this.files = [];
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
    this.files = this.generateTreeNode(this.course.temas);
  }

  generateTreeNode(topics: TopicModel[]): TreeNode[] {
    return topics.map(
      ({ temaID, titulo, cursoID, orden, tareas }: TopicModel) => {
        return {
          data: {
            titulo: titulo,
            tarea: '',
            porcentaje: '',
            temaID,
            cursoID,
            orden,
            type: 'delete.topic',
          },
          children: [
            {
              data: {
                titulo: 'tareas',
                tarea: '',
                porcentaje: '',
                temaID,
                cursoID,
                orden,
                type: 'delete.all.task',
              },
              children: [
                ...tareas.map((tarea) => ({
                  data: {
                    titulo: '',
                    tarea: tarea.titulo,
                    porcentaje: tarea.porcentaje,
                    temaID,
                    cursoID,
                    orden: '',
                    tareaId: tarea._id,
                    type: 'delete.one.task',
                  },
                })),
              ],
            },
          ],
        };
      }
    );
  }

  deleteItem(item: any) {
    console.log(item);
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
        break;
      default:
        break;
    }

    this.swal$.confirmationPopup(title, text, btnMessage).then((result) => {
      if (result.isConfirmed) {
        this.swal$.succesMessage('Item elimado correctamente');
      }
    });
  }
}