import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToDoService } from '../../services/to-do.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private router: Router,
    public auth: AuthService,
    public todoservice: ToDoService
  ) {}

  resetText(): void {
    let text: HTMLInputElement | null = document.querySelector('.text');
    if (text) {
      text.value = '';
      this.todoservice.filterTodos('');
    }
  }

  toggleDisplayClass(): void {
    let todo_list: DOMTokenList | undefined =
      document.querySelector('.todo-list')?.classList;
    let todo: Element | null = document.querySelector('.todo-list');
    if (todo_list) {
      todo_list!.forEach((el) => {
        if (el == 'horizontal') {
          todo?.classList.add('vertical');
          todo?.classList.remove('horizontal');
        } else if (el == 'vertical') {
          todo?.classList.remove('vertical');
          todo?.classList.add('horizontal');
        }
      });
    }
  }

  isTodoPage(): boolean {
    if (
      this.router.url == '/favorites' ||
      this.router.url == '/finished' ||
      this.router.url == '/'
    ) {
      return true;
    }
    return false;
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
