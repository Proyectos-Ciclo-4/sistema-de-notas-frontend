import { TopicModel } from './topic.model';

export interface CourseModel {
  cursoID: string;
  titulo: string;
  temas?: TopicModel[];
}
