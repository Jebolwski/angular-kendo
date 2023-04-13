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
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  todo!: ToDo | undefined;

  todos: ToDo[] | [] = [];

  notyf: Notyf = new Notyf({ duration: 1500 });

  favorites: ToDo[] | [] = [];

  finished: ToDo[] | [] = [];

  favoritesTemp: ToDo[] | [] = [];

  finishedTemp: ToDo[] | [] = [];

  todosTemp: ToDo[] | [] = [];

  deleteTodo!: ToDo | undefined;

  constructor(public firestore: Firestore, private auth: AuthService) {}

  async getATodo(id: string): Promise<Unsubscribe> {
    const todoRef = doc(this.firestore, 'todos', id);
    return onSnapshot(todoRef, (snapshot: any) => {
      this.todo = { ...snapshot.data(), id: snapshot.id };
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
    this.finished = this.finishedTemp.filter((todo) => {
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
        .then(() => {})
        .catch((err: Error) => {
          console.log(err);
        });
    }
  }

  async allFavorites(): Promise<Unsubscribe> {
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
    let productRef = collection(this.firestore, 'todos');

    if (this.auth.user?.uid) {
      data['uid'] = this.auth.user?.uid;
    }

    data['finished'] = false;
    data['created'] = Date.now();
    console.log(data);

    await addDoc(productRef, data)
      .then(() => {
        this.notyf.success('Görev başarıyla eklendi. ✨');
      })
      .catch(() => {
        this.notyf.success('Görev eklenirken bir hata oluştu. 😢');
      });
  }

  async allTodos(): Promise<Unsubscribe> {
    let todoRef = query(collection(this.firestore, 'todos'));

    const q = query(
      todoRef,
      orderBy('created', 'desc'),
      where('uid', '==', this.auth.user?.uid)
    );

    return onSnapshot(q, (snapshot: any) => {
      this.todos = snapshot.docs.map((data: { data(): ToDo; id: string }) => {
        return { ...data.data(), id: data.id };
      });
      this.todosTemp = this.todos;
    });
  }

  async allFinished(): Promise<Unsubscribe> {
    let todoRef = query(collection(this.firestore, 'todos'));

    const q = query(
      todoRef,
      where('uid', '==', this.auth.user?.uid),
      where('finished', '==', true)
    );

    return onSnapshot(q, (snapshot: any) => {
      this.finished = snapshot.docs.map(
        (data: { data(): ToDo; id: string }) => {
          console.log(data.data());

          return { ...data.data(), id: data.id };
        }
      );
      this.finishedTemp = this.finished;
    });
  }

  async deleteTodos(id: string): Promise<void> {
    let todoRef = doc(this.firestore, 'todos', id);
    await deleteDoc(todoRef)
      .then(() => {
        this.closeDeleteModal();
        this.notyf.success('Görev başarıyla silindi. 🌝');
      })
      .catch((err) => {
        console.log(err);
        this.notyf.error('Görev silinirken bir hata oluştu. 😥');
      });
  }

  openDeleteModal(todo: ToDo) {
    this.deleteTodo = todo;
    document.querySelector('.todo-modal')?.classList.remove('hidden');
  }

  closeDeleteModal() {
    this.deleteTodo = undefined;
    document.querySelector('.todo-modal')?.classList.add('hidden');
  }

  async toggleTodoState(tid: string, state: boolean): Promise<void> {
    if (this.auth.user?.uid) {
      let data: { finished: boolean } = {
        finished: state,
      };

      let todo = doc(this.firestore, 'todos', tid);
      await updateDoc(todo, data)
        .then(() => {})
        .catch((err: Error) => {
          console.log(err);
        });
    }
  }
}
