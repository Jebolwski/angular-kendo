import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToDoService } from '../../services/to-do.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public auth: AuthService, public todoservice: ToDoService) {}

  resetText(): void {
    let text: HTMLInputElement | null = document.querySelector('.text');
    if (text) {
      text.value = '';
      this.todoservice.filterTodos('');
    }
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
