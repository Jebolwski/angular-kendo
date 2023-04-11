import { Injectable } from '@angular/core';
import { addDoc, Firestore, orderBy, updateDoc } from '@angular/fire/firestore';
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

  favorites: ToDo[] | [] = [];

  favoritesTemp: ToDo[] | [] = [];

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
    this.favorites = this.favoritesTemp.filter((todo) => {
      return (
        todo.title.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
        todo.description.toLocaleLowerCase().includes(text.toLocaleLowerCase())
      );
    });
  }

  async addToFavorite(tid: string, state: boolean): Promise<void> {
    if (this.auth.user?.uid) {
      let data: { favorite: boolean } = {
        favorite: state,
      };

      let todo = doc(this.firestore, 'todos', tid);
      await updateDoc(todo, data)
        .then(() => {
          console.log('success');
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  }

  async getFavorites(): Promise<Unsubscribe> {
    let todoRef = query(collection(this.firestore, 'todos'));
    const q = query(
      todoRef,
      where('uid', '==', this.auth.user?.uid),
      where('favorite', '==', true)
    );

    return onSnapshot(q, (snapshot: any) => {
      this.favorites = snapshot.docs.map(
        (data: { data(): ToDo; id: string }) => {
          return { ...data.data(), id: data.id };
        }
      );
      this.favoritesTemp = this.favorites;
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
    const q = query(
      todoRef,
      orderBy('favorite', 'desc'),
      where('uid', '==', this.auth.user?.uid)
    );

    return onSnapshot(q, (snapshot: any) => {
      this.todos = snapshot.docs.map((data: { data(): ToDo; id: string }) => {
        return { ...data.data(), id: data.id };
      });
      this.todosTemp = this.todos;
    });
  }

  async toggleTodoState(tid: string, state: boolean): Promise<void> {
    if (this.auth.user?.uid) {
      let data: { finished: boolean } = {
        finished: state,
      };

      let todo = doc(this.firestore, 'todos', tid);
      await updateDoc(todo, data)
        .then(() => {
          console.log('success');
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  }
}
