export interface UserModel {
  uid?: string;
  name: string;
  lastName: string;
  celPhone: number;
  idType: IdType;
  idNumber: string;
  rol: Role;
  email: string
}

export enum IdType {
  CC,
  TI,
  CE,
  PEP,
}

export enum Role {
  Profesor,
  Estudiante,
}
