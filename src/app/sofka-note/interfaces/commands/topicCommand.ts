import { TaskCommand } from './taskCommand';

export interface TopicCommand {
  cursoID: string;
  orden: number;
  titulo: string;
  tareas: TaskCommand[];
}
