import { TaskModel } from "./task.model";

export interface TopicModel {

  temaID:  string;
  cursoID: string;
  titulo:  string;
  orden:   number;
  tareas:  TaskModel[];
}
