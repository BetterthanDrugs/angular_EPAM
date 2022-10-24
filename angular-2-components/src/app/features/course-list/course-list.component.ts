import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Course } from '../courses/courses.model';

import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Account } from '../../app.model';
import { CoursesStoreService } from '../../services/courses-store.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})

//todo: не подтягиваются изменения с сервисов сами (глобальная проблема проекта,
// все компоненты не правильно подтягивают изменения из сервисов): при авторизации или поиске список курсов
// обновляется только при доп событии. AuthGuard и interceptor тоже не подтягиваются и не отрабатывают.
// Деавторизация тоже через раз работать начинает.

export class CourseListComponent implements OnInit, OnDestroy {
  iconButtonEdit = faPencil;
  iconButtonDelete = faTrash;
  private readonly destroy$ = new ReplaySubject(1);

  courses: Course[] = [];
  showModalFlag = false;
  showEditFormFlag = false;
  editFormButtonSubmitText = 'Edit Course';
  account: Account;
  modalObj: Course = {
    id: '',
    title: '',
    description: '',
    creationDate: '',
    duration: 0,
    authors: [],
  };

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _courseStoreService: CoursesStoreService
  ) {
    this.account = this._authService.getUser();
  }

  ngOnInit(): void {
    this._courseStoreService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    this._courseStoreService.courses$
      .pipe(takeUntil(this.destroy$))
      .subscribe(courses => {
        this.courses = courses;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(() => {});
    this.destroy$.complete();
  }

  searchCourse(title: string): void {
    console.log('search course test: ', title);
    this._courseStoreService
      .filterCourse({ title })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
    // this.filterValue = courseName;
  }

  showCourseButtonEvent(course: Course): void {
    console.log('showCourseButtonEvent');
    this.showModalFlag = true;
    this.modalObj = { ...course };
    this._router.navigateByUrl(`/courses/${course.id}`);
  }
  editCourseButtonEvent(course: Course): void {
    // this.editCourseEvent.emit(course.id);
    this.showEditFormFlag = true;
    this.modalObj = { ...course };
    this._router.navigateByUrl(`/courses/edit/${course.id}`);
  }
  deleteCourseButtonEvent(course: Course): void {
    // this.deleteCourseEvent.emit(course.id);
  }
}
