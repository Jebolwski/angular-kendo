import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environments';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsComponent } from './components/buttons/buttons.component';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import { SigninComponent } from './components/signin/signin.component';
import { HeaderComponent } from './components/header/header.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ErrorMessagesComponent } from './components/error-messages/error-messages.component';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {IconsModule} from "@progress/kendo-angular-icons";
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    ButtonsComponent,
    SigninComponent,
    HeaderComponent,
    ErrorMessagesComponent,
    SignUpComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    AngularFireStorageModule,
    ReactiveFormsModule,
    IconsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
