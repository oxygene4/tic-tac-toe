import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule, routingComponents} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {StepInterceptor} from './core/step-interceptor.service';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment';

import { ToastrModule } from 'ngx-toastr';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AuthService} from './services/auth.service';
import {UserService} from './services/user.service';
import {GameService} from './services/game.service';
import {ToasterService} from './services/toaster.service';
import {UserResolver} from './core/user.resolver';
import {AuthGuard} from './core/auth.guard';
import { ParallaxComponent } from './parallax/parallax.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ParallaxComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [AuthService, UserService, GameService, UserResolver, AuthGuard, ToasterService, {
    provide: HTTP_INTERCEPTORS,
    useClass: StepInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
