import { Injectable } from '@angular/core';

import { Auth, UserCredential } from '@angular/fire/auth';
import {
  CollectionReference,
  collection,
  Firestore,
  doc,
  setDoc,
  getDoc,
  collectionData,
  where,
  query,
} from '@angular/fire/firestore';

import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  User,
} from '@firebase/auth';
import { Observable } from 'rxjs';
import { LoginModel } from '../interface/Login.model';
import { Role, UserModel } from '../interface/user.model';
import { map, catchError, of } from 'rxjs';
import { StudentCommand } from 'src/app/sofka-note/interfaces/commands/studentCommand';
import { StudentViewModel } from '../../sofka-note/interfaces/studentView.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TeacherCommand } from '../../sofka-note/interfaces/commands/teacherCommand';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private refCollectionUser: CollectionReference = collection(
    this.store$,
    'users'
  );

  private BASE_USRL: string = environment.baseUrl;

  constructor(private auth$: Auth, private store$: Firestore,private http: HttpClient) {}

  createStudentCommand(student: StudentCommand): Observable<StudentViewModel> {
    return this.http.post<StudentViewModel>(
      `${this.BASE_USRL}/crearEstudiante`,
      student
    ) as Observable<StudentViewModel>
  }

  createProfesorCommand(teacher: TeacherCommand): Observable<TeacherCommand> {
    return this.http.post<TeacherCommand>(
      `${this.BASE_USRL}/crearProfesor`,
      teacher
    );
  }

  logout() {
    return signOut(this.auth$);
  }

  register({ email, password }: LoginModel): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth$, email, password);
  }

  login({ email, password }: LoginModel): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth$, email, password);
  }

  resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth$, email);
  }

  updateUser(user: User, displayName: string) {
    return updateProfile(user, { displayName });
  }

  createUser(user: UserModel) {
    const userRef = doc(this.refCollectionUser, user.uid);
    return setDoc(userRef, user);
  }

  AllUsers() {
    let users = collectionData(this.refCollectionUser);

    return users;
  }

  currentUser() {
    const queryUser = query(
      this.refCollectionUser,
      where('uid', '==', this.auth$.currentUser?.uid)
    );
    return collectionData(queryUser, { idField: 'uid' }) as Observable<
      UserModel[]
    >;
  }

  validateStudentRol(): Observable<boolean> {
    return this.currentUser().pipe(
      map((resp) => {
        return resp[0].rol === Role.Estudiante;
      }),
      catchError((err) => of(false))
    );
  }
  validateTeacherRol(): Observable<boolean> {
    return this.currentUser().pipe(
      map((resp) => {
        return resp[0].rol === Role.Profesor;
      }),
      catchError((err) => of(false))
    );
  }
}
