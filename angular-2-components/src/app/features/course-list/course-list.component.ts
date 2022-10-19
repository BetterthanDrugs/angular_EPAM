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
  showEditFormFlag = false;
  editFormButtonSubmitText = 'Edit Course';
  modalObj: Course = {
    id: '',
    title: '',
    description: '',
    creationDate: '',
    duration: 0,
    authors: [],
  };

  constructor() {}

  showCourseButtonEvent(course: Course): void {
    console.log('showCourseButtonEvent');
  }
  editCourseButtonEvent(course: Course): void {
    // this.editCourseEvent.emit(course.id);
    this.showEditFormFlag = true;
    this.modalObj = { ...course };
  }
  deleteCourseButtonEvent(course: Course): void {
    // this.deleteCourseEvent.emit(course.id);
  }
}
