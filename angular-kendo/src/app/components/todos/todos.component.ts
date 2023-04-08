import {Component} from '@angular/core';
import {ToDoService} from "../../services/to-do.service";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent {
  constructor(public todoservice: ToDoService) {
    todoservice.allTodos();
  }
}
