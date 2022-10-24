import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesComponent } from './courses.component';
import { CourseComponent } from '../course/course.component';
import { CourseListComponent } from '../course-list/course-list.component';
import { ModalWindowComponent } from '../modal-window/modal-window.component';
import { EditFormComponent } from '../edit-form/edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterLink} from "@angular/router";
import {AppModule} from "../../app.module";
import {ShowCourseComponent} from "../show-course/show-course.component";

@NgModule({
  declarations: [
    CoursesComponent,
    CourseComponent,
    CourseListComponent,
    ModalWindowComponent,
    EditFormComponent,
    ShowCourseComponent,
  ],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, RouterLink],
  bootstrap: [CoursesComponent],
  exports: [CoursesComponent, ModalWindowComponent],
})
export class CoursesModule {}
