import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SofkaNoteRoutingModule } from './sofka-note-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { SofkaNoteComponent } from './sofka-note.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { HeaderTitleComponent } from './shared/header-title/header-title.component';
import { TopicFormComponent } from './components/topic-form/topic-form.component';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { AssignTaskComponent } from './components/assign-task-form/assign-task.component';
import { HomeStudentComponent } from './pages/home-student/home-student.component';
import { HistoryCoursesComponent } from './components/history-courses/history-courses.component';
import { TableStudentsComponent } from './components/table-students/table-students.component';
import { DeliveryTaskComponent } from './components/delivery-task/delivery-task.component';
import { MySuscriptionsComponent } from './components/my-suscriptions/my-suscriptions.component';
import { ModalNoteComponent } from './components/modal-note/modal-note.component';


@NgModule({
  declarations: [
    HomeComponent,
    SofkaNoteComponent,
    SearchInputComponent,
    HeaderTitleComponent,
    TopicFormComponent,
    ModalFormComponent,
    AssignTaskComponent,
    HomeStudentComponent,
    HistoryCoursesComponent,
    TableStudentsComponent,
    DeliveryTaskComponent,
    MySuscriptionsComponent,
    ModalNoteComponent,
  ],
  imports: [
    CommonModule,
    SofkaNoteRoutingModule,
    SharedModule,
    FormsModule,
    PrimeNgModule,
    ReactiveFormsModule,
  ],
})
export class SofkaNoteModule {}
