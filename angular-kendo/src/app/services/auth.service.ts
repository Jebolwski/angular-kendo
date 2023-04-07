import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, User } from '@angular/fire/auth';
import {
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
} from 'firebase/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private angularfireauth: AngularFireAuth,
    private router: Router
  ) {}

  darkMode: string | null = 'false';

  user: User | undefined | null = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  async loginWithEmailPsw(data: {
    email: string;
    password: string;
  }): Promise<any> {
    console.log(data);

    this.angularfireauth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(async (resp) => {
        localStorage.setItem('user', JSON.stringify(resp.user));
        this.user = JSON.parse(localStorage.getItem('user')!);
        this.router.navigate(['/']);
        console.log(this.user);
      })
      .catch((err: Error) => {
        this.user = undefined;
        localStorage.removeItem('user');
      });
  }

  async loginWithGmail(): Promise<any> {
    return this.angularfireauth
      .signInWithPopup(new GoogleAuthProvider())
      .then((resp) => {
        console.log(resp.user?.email);
        // console.log(resp.user._delegate);
        localStorage.setItem('user', JSON.stringify(resp.user));
        this.user = JSON.parse(localStorage.getItem('user')!);
        this.router.navigate(['/']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  toggleDarkMode(theme: string | null): void {
    this.darkMode = theme;
    localStorage.setItem('theme', theme || 'light');
  }

  signUp(data: { email: string; password: string; username: string }) {
    this.angularfireauth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(() => {
        this.router.navigate(['/sign-in']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async signOut(): Promise<any> {
    this.angularfireauth
      .signOut()
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('authTokens');
        this.user = undefined!;
        this.router.navigate(['/']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async verifyEmail(): Promise<void> {
    const auth = getAuth();
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser, null).then(() => {
        console.log('geldi');
      });
    }
  }

  async resetPassword(): Promise<void> {
    const auth = getAuth();
    if (auth.currentUser && auth.currentUser.email) {
      await sendPasswordResetEmail(auth, auth.currentUser?.email)
        .then(() => {
          console.log('sent reset psw mail');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  }
}
