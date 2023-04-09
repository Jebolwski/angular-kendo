import {Component} from '@angular/core';
import {ToDoService} from "../../services/to-do.service";
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent {
  constructor(public todoservice: ToDoService) {
    todoservice.allTodos();
  }

  closeTitle() {
    let title: HTMLInputElement | null = document.querySelector(".title");
    let desc: HTMLInputElement | null = document.querySelector(".desc");
    let close: HTMLInputElement | null = document.querySelector(".close");
    if (title != null && desc != null && close != null) {
      title.classList.add("hidden");
      close.classList.add("hidden");
      desc.classList.add("rounded-t-md");
      desc.classList.add("rounded-b-md");
    }
  }

  openTitle() {
    let title: HTMLInputElement | null = document.querySelector(".title");
    let desc: HTMLInputElement | null = document.querySelector(".desc");
    let close: HTMLInputElement | null = document.querySelector(".close");
    if (title != null && desc != null && close != null) {
      title.classList.remove("hidden");
      close.classList.remove("hidden");
      desc.classList.remove("rounded-t-md");
      desc.classList.remove("rounded-b-md");
    }
  }

  todoForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.maxLength(30),
      Validators.minLength(3),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(140),
      Validators.minLength(10),
    ]),
  });

  get title() {
    return this.todoForm.get('title');
  }

  get description() {
    return this.todoForm.get('description');
  }
}
