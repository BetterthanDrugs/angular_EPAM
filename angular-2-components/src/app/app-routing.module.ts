import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { CoursesComponent } from './features/courses/courses.component';
import { RegistrationComponent } from './features/registration/registration.component';
import { EditFormComponent } from './features/edit-form/edit-form.component';
import { ShowCourseComponent } from './features/show-course/show-course.component';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    canActivate: [NotAuthorizedGuard],
    component: LoginComponent,
    // loadChildren: () =>
    //   import('./features/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'registration',
    canActivate: [NotAuthorizedGuard],
    component: RegistrationComponent,
    // loadChildren: () =>
  },
  {
    path: 'courses',
    canLoad: [AuthorizedGuard],
    component: CoursesComponent,
    // loadChildren: () =>
    //   import('./features/courses/courses.module').then(m => m.CoursesModule),
    children: [
      { path: 'add', canLoad: [AuthorizedGuard], component: EditFormComponent },
      {
        path: ':id',
        canLoad: [AuthorizedGuard],
        component: ShowCourseComponent,
      },
      {
        path: 'edit/:id',
        canLoad: [AuthorizedGuard],
        component: EditFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
