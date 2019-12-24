import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule, routingComponents} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import materialComponents from './materialComponents';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AuthService} from './core/auth.service';
import {UserService} from './core/user.service';
import {GameService} from './core/game.service';
import {UserResolver} from './home/user.resolver';
import {AuthGuard} from './core/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ...materialComponents,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [AuthService, UserService, GameService, UserResolver, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
