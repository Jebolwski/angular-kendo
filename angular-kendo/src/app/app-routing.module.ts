import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { NotLoggedInService } from './services/not-logged-in.service';
import { TodosComponent } from './components/todos/todos.component';
import { LoggedInService } from './services/logged-in.service';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { FinishedComponent } from './components/finished/finished.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    title: 'Anasayfa',
    canActivate: [NotLoggedInService],
  },
  {
    path: '',
    component: TodosComponent,
    title: 'Görevlerim',
    canActivate: [LoggedInService],
  },
  {
    path: 'finished',
    component: FinishedComponent,
    title: 'Bitenler',
    canActivate: [LoggedInService],
  },
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
    path: 'favorites',
    component: FavoritesComponent,
    title: 'Favorilerim',
    canActivate: [LoggedInService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
