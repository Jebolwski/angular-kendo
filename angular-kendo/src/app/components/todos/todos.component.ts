import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ToDoService} from "../../services/to-do.service";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent {
  constructor(public todoservice: ToDoService) {
    todoservice.allTodos();
    console.log(todoservice.todos);
  }
}
