import {RouterModule, Routes} from '@angular/router';

import {LandingComponent} from './landing/landing.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {UserResolver} from './home/user.resolver';
import {AuthGuard} from './core/auth.guard';
import {NgModule} from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    component: LandingComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    resolve: {data: UserResolver}
  }
];

export const routingComponents = [
  LandingComponent,
  LoginComponent,
  RegisterComponent,
  HomeComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
