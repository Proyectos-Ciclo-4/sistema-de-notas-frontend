import { Injectable } from '@angular/core';

import { Auth, UserCredential } from '@angular/fire/auth';
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from '@firebase/auth';
import { LoginModel } from '../interface/Login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth$: Auth) {}

  logout() {
    return signOut(this.auth$);
  }

  register({ email, password }: LoginModel): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth$, email, password);
  }

  login({ email, password }: LoginModel): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth$, email, password);
  }

  resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth$, email);
  }
}
