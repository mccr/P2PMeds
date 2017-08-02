import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RouteComponent } from './route/route.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
  { path: '', component: RouteComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'route/:id', component: RouteComponent},
  { path: 'threads/:id', component: RouteComponent},
  { path: '**', redirectTo: '' }
];
