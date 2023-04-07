import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-kendo';
  constructor(public auth: AuthService) {
    let theme: string | null = localStorage.getItem('theme');
    this.auth.toggleDarkMode(theme);
  }
}
