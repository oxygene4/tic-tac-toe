import {RouterModule, Routes} from '@angular/router';

import {LandingComponent} from './landing/landing.component';
import {HomeComponent} from './home/home.component';
import {AuthComponent} from './auth/auth.component';
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
    path: 'auth',
    component: AuthComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    resolve: {data: UserResolver}
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export const routingComponents = [
  LandingComponent,
  AuthComponent,
  HomeComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
