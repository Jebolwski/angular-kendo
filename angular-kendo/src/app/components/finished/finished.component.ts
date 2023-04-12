import { Component } from '@angular/core';
import { ToDoService } from 'src/app/services/to-do.service';

@Component({
  selector: 'app-finished',
  templateUrl: './finished.component.html',
  styleUrls: ['./finished.component.scss'],
})
export class FinishedComponent {
  constructor(public todoservice: ToDoService) {
    todoservice.allFinished();
  }
}
