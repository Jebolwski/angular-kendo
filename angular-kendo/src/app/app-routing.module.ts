import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ButtonsComponent} from './components/buttons/buttons.component';
import {SigninComponent} from './components/signin/signin.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {HomeComponent} from './components/home/home.component';
import {NotLoggedInService} from './services/not-logged-in.service';
import {TodosComponent} from "./components/todos/todos.component";
import {LoggedInService} from "./services/logged-in.service";

const routes: Routes = [
  {path: '', component: HomeComponent, title: 'Home'},
  {
    path: 'sign-in',
    component: SigninComponent,
    title: 'Sign In',
    canActivate: [NotLoggedInService],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    title: 'Sign Up',
    canActivate: [NotLoggedInService],
  },
  {
    path: 'todos',
    component: TodosComponent,
    title: 'Todos',
    canActivate: [LoggedInService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
