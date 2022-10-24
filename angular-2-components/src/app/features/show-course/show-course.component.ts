import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '../courses/courses.model';
import { ROUTS_LIST } from '../../app.model';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CoursesStoreService } from '../../services/courses-store.service';
// import { COURSE_DEFAULT } from './modal-window.model';

export const COURSE_DEFAULT = {
  authors: [],
  creationDate: '',
  description: '',
  duration: 0,
  id: '',
  title: '',
};

@Component({
  selector: 'app-show-course',
  templateUrl: './show-course.component.html',
  styleUrls: ['./show-course.component.scss'],
})
export class ShowCourseComponent implements OnInit {
  @Input() showObj: Course = COURSE_DEFAULT;
  @Output() closeEvent = new EventEmitter<void>();
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _courseStoreService: CoursesStoreService
  ) {
    // this.account = this._authService.getUser();
  }

  closeModalButtonEvent(): void {
    this._router.navigateByUrl(ROUTS_LIST.COURSES_PAGE);
    this.closeEvent.emit();
  }

  ngOnInit(): void {}
}
