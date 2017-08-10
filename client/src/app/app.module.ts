import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { FileSelectDirective } from "ng2-file-upload";

import {
  MaterialModule,
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdChipsModule,
  MdCoreModule,
  MdDatepickerModule,
  MdDialogModule,
  MdExpansionModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdNativeDateModule,
  MdPaginatorModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdSortModule,
  MdTableModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk';

import { SessionService } from '../shared/session.service';
import { RouteService } from '../shared/route.service';
import { PetitionService } from '../shared/petition.service';
import { RatingService } from '../shared/rating.service';
import { AirportService } from '../shared/airport.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RouteComponent } from './route/route.component';
import { SignupComponent } from './signup/signup.component';
import { RouteNewComponent } from './route-new/route-new.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { RouteEditComponent } from './route-edit/route-edit.component';
import { UserRatingComponent } from './user-rating/user-rating.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RouteComponent,
    SignupComponent,
    RouteNewComponent,
    NavbarComponent,
    UserEditComponent,
    RouteEditComponent,
    UserRatingComponent,
    FileSelectDirective,
    FooterComponent,
  ],
  entryComponents: [
    UserEditComponent,
    RouteEditComponent,
    UserRatingComponent
  ],
  imports: [
    StarRatingModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpModule,
    FormsModule,
    NguiAutoCompleteModule,
    MaterialModule,
    MdNativeDateModule,
    ReactiveFormsModule,
    CdkTableModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdCoreModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdPaginatorModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
    MdDatepickerModule
  ],
  providers: [
    RatingService,
    PetitionService,
    RouteService,
    SessionService,
    AirportService,
    { provide: 'BASE_ENDPOINT', useValue: environment.baseEndpoint },
    { provide: 'API_ENDPOINT', useValue: environment.apiEndpoint },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
