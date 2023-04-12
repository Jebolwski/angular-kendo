import { Component, Input } from '@angular/core';
import { ToDo } from 'src/app/interfaces/to-do';
import { ToDoService } from 'src/app/services/to-do.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent {
  constructor(public todoservice: ToDoService) {}

  @Input() todo: ToDo | undefined = this.todoservice.deleteTodo;
}
