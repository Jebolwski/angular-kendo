import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { ToDoService } from './services/to-do.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-kendo';
  constructor(
    public auth: AuthService,
    public todoservice: ToDoService,
    private router: Router
  ) {
    let theme: string | null = localStorage.getItem('theme');
    this.auth.toggleDarkMode(theme);
  }

  isTodoPage(): boolean {
    if (this.router.url == '/favorites' || this.router.url == '/') {
      return true;
    }
    return false;
  }
}
