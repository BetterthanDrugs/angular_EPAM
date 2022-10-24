import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoursesModule } from './features/courses/courses.module';
import { LoginComponent } from './features/login/login.component';
import { SharedModule } from './shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegistrationComponent } from './features/registration/registration.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ShowCourseComponent } from './features/show-course/show-course.component';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';
import {AuthorizedGuard} from "./auth/guards/authorized.guard";

@NgModule({
  declarations: [AppComponent, LoginComponent, RegistrationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CoursesModule,
    SharedModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    AuthorizedGuard,
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
