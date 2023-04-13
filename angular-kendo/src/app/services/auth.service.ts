import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, User } from '@angular/fire/auth';
import {
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { Notyf } from 'notyf';

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

  notyf: Notyf = new Notyf({ duration: 1500 });

  async loginWithEmailPsw(data: {
    email: string;
    password: string;
  }): Promise<any> {
    this.angularfireauth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(async (resp) => {
        localStorage.setItem('user', JSON.stringify(resp.user));
        this.user = JSON.parse(localStorage.getItem('user')!);
        this.router.navigate(['/']);
        this.notyf.success('Başarıyla giriş yapıldı. 😄');
      })
      .catch((err: Error) => {
        if (err.message == 'Firebase: Error (auth/user-not-found).') {
          this.notyf.error('Girdiğiniz şifre veya email yanlış. 🤨');
        } else {
          this.notyf.error('Giriş yapılırken bir hata oluştu. 🐌');
        }
        this.user = undefined;
        localStorage.removeItem('user');
      });
  }

  async loginWithGmail(): Promise<any> {
    return this.angularfireauth
      .signInWithPopup(new GoogleAuthProvider())
      .then((resp) => {
        console.log(resp.user?.email);
        localStorage.setItem('user', JSON.stringify(resp.user));
        this.user = JSON.parse(localStorage.getItem('user')!);
        this.router.navigate(['/']);
        this.notyf.success('Başarıyla giriş yapıldı. 🚀');
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
        this.notyf.success('Başarıyla kayıt olundu. ✨');
      })
      .catch((err: Error) => {
        if (err.message == 'Firebase: Error (auth/invalid-email).') {
          this.notyf.error('Girdiğiniz email hatalı. 🥲');
        } else {
          this.notyf.error('Kayıt olunurken bir hata oluştu. 🫥');
        }
      });
  }

  async signOut(): Promise<any> {
    this.angularfireauth
      .signOut()
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('authTokens');
        this.user = undefined;
        this.router.navigate(['/home']);
        this.notyf.success('Başarıyla çıkış yapıldı. 🧨');
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
