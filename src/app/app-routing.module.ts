import {RouterModule, Routes} from '@angular/router';

import {LandingComponent} from './landing/landing.component';
import {GameComponent} from './game/game.component';
import {UserResolver} from './core/user.resolver';
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
    path: 'game',
    component: GameComponent,
    resolve: {data: UserResolver}
  },
  {
    path: '**',
    redirectTo: 'landing'
  }
];

export const routingComponents = [
  LandingComponent,
  GameComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
