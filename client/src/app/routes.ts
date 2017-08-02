import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RouteComponent } from './route/route.component';
import { SignupComponent } from './signup/signup.component';
import { RouteDetailComponent } from './route-detail/route-detail.component';
import { RouteNewComponent } from './route-new/route-new.component';
import { RouteUpdateComponent } from './route-update/route-update.component';

export const routes: Routes = [
  { path: '', component: RouteComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'route', component: RouteNewComponent},
  { path: 'route/:id', component: RouteUpdateComponent},
  { path: '**', redirectTo: '' }
];
