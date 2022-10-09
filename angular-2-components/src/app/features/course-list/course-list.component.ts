import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../courses/courses.model';

import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent {
  iconButtonEdit = faPencil;
  iconButtonDelete = faTrash;

  @Input() courses: Course[] = [];
  showModalFlag = false;
  modalObj: Course = {
    id: '',
    title: '',
    description: '',
    creationDate: '',
    duration: 0,
    authors: [],
  };
  //todo: сделать crud на сервисах
  // @Output() showCourseEvent = new EventEmitter();
  // @Output() editCourseEvent = new EventEmitter();
  // @Output() deleteCourseEvent = new EventEmitter();

  constructor() {}

  showCourseButtonEvent(course: Course) {
    this.showModalFlag = true;
    this.modalObj = { ...course };
    // this.showCourseEvent.emit(course.id);
  }
  editCourseButtonEvent(course: Course) {
    // this.editCourseEvent.emit(course.id);
  }
  deleteCourseButtonEvent(course: Course) {
    // this.deleteCourseEvent.emit(course.id);
  }
}
