import { TopicModel } from './topic.model';

export interface CourseModel {
  _id:        string;
  titulo:     string;
  profesorID: string;
  temas:      TopicModel[];
}
