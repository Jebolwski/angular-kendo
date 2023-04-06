import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ButtonsComponent} from "./components/buttons/buttons.component";
import {SigninComponent} from "./components/signin/signin.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  {path:"",component:HomeComponent,title:"Home"},
  {path:"buttons",component:ButtonsComponent,title:"Buttons"},
  {path:"sign-in",component:SigninComponent,title:"Sign In"},
  {path:"sign-up",component:SignUpComponent,title:"Sign Up"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
