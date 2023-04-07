import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotLoggedInService {
  constructor(private auth: AuthService) {}

  canActivate(): boolean {
    let flag: boolean = false;
    if (!(localStorage.getItem('user') && this.auth.user != undefined)) {
      flag = true;
    }
    return flag;
  }
}
