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
import { TokenInterceptor } from './auth/interceptors/token.interceptor';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { StoreModule } from '@ngrx/store';
import { effects, reducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthModule } from './auth/auth.module';
import { AuthorsStateFacade } from './store/authors/authors.facade';
import { CoursesStateFacade } from './store/courses/courses.facade';

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
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: false }),
    AuthModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    AuthorizedGuard, AuthorsStateFacade, CoursesStateFacade
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
