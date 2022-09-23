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
import { UserModel } from '../interface/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private refCollectionUser: CollectionReference = collection(
    this.store$,
    'users'
  );

  constructor(private auth$: Auth, private store$: Firestore) {}

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
}
