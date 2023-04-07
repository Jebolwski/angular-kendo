import {Injectable} from '@angular/core';
import {addDoc, Firestore} from '@angular/fire/firestore';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  Unsubscribe,
  updateDoc,
  where,
} from 'firebase/firestore';
import {ToDo} from "../interfaces/to-do";
import {AuthService} from "./auth.service";
import slugify from "slugify";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ToDoService {


  todo!: ToDo | undefined;
  todos: ToDo[] | [] = [];

  constructor(public firestore: Firestore, private auth: AuthService, private router: Router) {
  }

  async getATodo(id: string): Promise<Unsubscribe> {
    const todoRef = doc(this.firestore, 'todos', id);
    return onSnapshot(todoRef, (snapshot: any) => {
      this.todo = {...snapshot.data(), id: snapshot.id};
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
          })
        })
        return {"mesi": "ronaldo"};
      }
    );
  }

  async addTodo(data: ToDo, event: any) {

    let productRef = collection(this.firestore, 'todos');

    if (this.auth.user?.uid) {
      data['uid'] = this.auth.user?.uid;
    }

    console.log(data);

    await addDoc(productRef, data)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }

  async deleteProduct(id: string) {
    let productRef = doc(this.firestore, 'todos', id);
    await deleteDoc(productRef)
      .then(() => {
        console.log("deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async allTodos(): Promise<Unsubscribe> {
    let user_q = query(collection(this.firestore, 'todos'));
    return onSnapshot(user_q, (snapshot: any) => {
      this.todos = snapshot.docs.map(
        (data: { data(): ToDo; id: string }) => {
          return {...data.data(), id: data.id};
        }
      );
    });
  }
}
