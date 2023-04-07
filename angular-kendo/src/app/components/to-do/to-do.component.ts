import {Component, Input} from '@angular/core';
import {ToDo} from "../../interfaces/to-do";

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent {

  @Input() todo!: ToDo;

}
