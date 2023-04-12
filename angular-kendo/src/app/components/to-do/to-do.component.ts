import { Component, Input } from '@angular/core';
import { ToDo } from '../../interfaces/to-do';
import { ToDoService } from '../../services/to-do.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss'],
})
export class ToDoComponent {
  constructor(public todoservice: ToDoService) {}

  @Input() todo!: ToDo;
}
