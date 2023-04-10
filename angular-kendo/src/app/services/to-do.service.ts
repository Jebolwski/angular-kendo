import { Injectable } from '@angular/core';
import { addDoc, Firestore, updateDoc } from '@angular/fire/firestore';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  Unsubscribe,
  where,
} from 'firebase/firestore';
import { ToDo } from '../interfaces/to-do';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  todo!: ToDo | undefined;

  todos: ToDo[] | [] = [];
  todosTemp: ToDo[] | [] = [];

  constructor(
    public firestore: Firestore,
    private auth: AuthService,
    private router: Router
  ) {}

  async getATodo(id: string): Promise<Unsubscribe> {
    const todoRef = doc(this.firestore, 'todos', id);
    return onSnapshot(todoRef, (snapshot: any) => {
      this.todo = { ...snapshot.data(), id: snapshot.id };
    });
  }

  async getFavoriteTodos(): Promise<Unsubscribe> {
    let filtered_q = query(
      collection(this.firestore, 'todos'),
      where('uid', '==', this.auth.user?.uid || '0')
    );

    return onSnapshot(filtered_q, (snapshot: any) => {
      this.todo = snapshot.docs.map((data: { data(): ToDo[]; id: string }) => {
        data.data().forEach((todo) => {
          console.log(todo);
        });
      });
      return { mesi: 'ronaldo' };
    });
  }

  filterTodos(text: string): void {
    this.todos = this.todosTemp.filter((todo) => {
      return (
        todo.title.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
        todo.description.toLocaleLowerCase().includes(text.toLocaleLowerCase())
      );
    });
  }

  async addTodo(data: ToDo) {
    console.log(data);
    let productRef = collection(this.firestore, 'todos');

    if (this.auth.user?.uid) {
      data['uid'] = this.auth.user?.uid;
    }

    data['finished'] = false;

    await addDoc(productRef, data)
      .then(() => {})
      .catch((err: Error) => {
        console.log(err);
      });
  }

  async deleteProduct(id: string) {
    let productRef = doc(this.firestore, 'todos', id);
    await deleteDoc(productRef)
      .then(() => {
        console.log('deleted');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async allTodos(): Promise<Unsubscribe> {
    let todoRef = query(collection(this.firestore, 'todos'));
    const q = query(todoRef, where('uid', '==', this.auth.user?.uid));

    return onSnapshot(q, (snapshot: any) => {
      this.todos = snapshot.docs.map((data: { data(): ToDo; id: string }) => {
        return { ...data.data(), id: data.id };
      });
      this.todosTemp = this.todos;
    });
  }

  async toggleTodoState(id: string): Promise<void> {
    await this.getATodo(id).then(async () => {
      console.log(this.todo);
      if (this.todo) {
        let todoRef = doc(this.firestore, 'todos', this.todo?.id || '0');
        let data: { finished: boolean } = { finished: false };
        data['finished'] = !this.todo?.finished;
        await updateDoc(todoRef, data)
          .then(() => {
            this.router.navigate(['/']);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }
}
