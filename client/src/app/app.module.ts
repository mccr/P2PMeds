import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { SessionService } from '../shared/session.service';
import { RouteService } from '../shared/route.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RouteComponent } from './route/route.component';
import { SignupComponent } from './signup/signup.component';
import { RouteDetailComponent } from './route-detail/route-detail.component';
import { RouteNewComponent } from './route-new/route-new.component';
import { RouteUpdateComponent } from './route-update/route-update.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RouteComponent,
    SignupComponent,
    RouteDetailComponent,
    RouteNewComponent,
    RouteUpdateComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpModule,
    FormsModule
  ],
  providers: [
    RouteService,
    SessionService,
    { provide: 'BASE_ENDPOINT', useValue: environment.baseEndpoint },
    { provide: 'API_ENDPOINT', useValue: environment.apiEndpoint }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
