export interface TopicModel {
  temaID: string,
  orden: number;
  titulo: string;
  fecha?: string;
  descripcion?: string;
  tareasID?: string[];
}
