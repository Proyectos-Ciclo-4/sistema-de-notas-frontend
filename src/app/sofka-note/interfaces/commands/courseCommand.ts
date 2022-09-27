import { TopicCommand } from './topicCommand';

export interface CourseCommand {
  profesorID: string;
  titulo: string;
  temas: TopicCommand[];
}
