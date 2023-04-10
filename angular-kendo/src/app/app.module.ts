import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environments';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ButtonsModule} from '@progress/kendo-angular-buttons';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonsComponent} from './components/buttons/buttons.component';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import {SigninComponent} from './components/signin/signin.component';
import {HeaderComponent} from './components/header/header.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ErrorMessagesComponent} from './components/error-messages/error-messages.component';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {HomeComponent} from './components/home/home.component';
import {IconsModule} from '@progress/kendo-angular-icons';
import {LabelModule} from '@progress/kendo-angular-label';
import {InputsModule} from '@progress/kendo-angular-inputs';
import {ToDoComponent} from './components/to-do/to-do.component';
import {TodosComponent} from './components/todos/todos.component';
import {TooltipsModule} from "@progress/kendo-angular-tooltip";
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonsComponent,
    SigninComponent,
    HeaderComponent,
    ErrorMessagesComponent,
    SignUpComponent,
    HomeComponent,
    ToDoComponent,
    TodosComponent,
    SidebarComponent,
    FavoritesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonsModule,
    TooltipsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    AngularFireStorageModule,
    ReactiveFormsModule,
    IconsModule,
    LabelModule,
    InputsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
