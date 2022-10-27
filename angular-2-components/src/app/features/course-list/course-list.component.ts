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
import { concatMap, Observable, ReplaySubject, takeUntil } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Account } from '../../app.model';
import { CoursesStoreService } from '../../services/courses-store.service';
import { UserStoreService } from '../../user/services/user-store.service';

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

  courses: Observable<Course[]> = this.courseStoreService.courses$;
  showModalInfoFlag = false;
  showEditFormFlag = false;
  showDeleteFormFlag = false;
  isAdmin: boolean | undefined = true;
  isEditForm: boolean = true;
  editFormButtonSubmitText = 'Edit Course';
  account: Account;
  modalObj: Course = {
    id: '',
    title: '',
    description: '',
    duration: 0,
    authors: [],
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private courseStoreService: CoursesStoreService,
    private userStoreService: UserStoreService
  ) {
    this.account = this.authService.getUser();
  }

  ngOnInit(): void {
    this.courseStoreService.getAll().pipe(takeUntil(this.destroy$)).subscribe();

    this.userStoreService.isAdmin$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isAdmin => {
        // this.isAdmin = isAdmin;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(() => {});
    this.destroy$.complete();
  }

  searchCourse(title: string): void {
    this.courseStoreService
      .filterCourse({ title })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  showCourseButtonEvent(course: Course): void {
    this.showModalInfoFlag = true;
    this.modalObj = { ...course };
    this.router.navigateByUrl(`/courses/${course.id}`);
  }
  editCourseButtonEvent(course: Course): void {
    this.showEditFormFlag = true;
    this.modalObj = { ...course };
    this.router.navigateByUrl(`/courses/edit/${course.id}`);
  }
  deleteCourseButtonEvent(course: Course): void {
    this.showDeleteFormFlag = true;
    this.modalObj = { ...course };
  }

  confirmDeleteCourseButtonEvent(): void {
    if (this.modalObj) {
      this.courseStoreService
        .deleteCourse(this.modalObj)
        .pipe(
          takeUntil(this.destroy$),
          concatMap(() => this.courseStoreService.getAll())
        )
        .subscribe();

      this.showDeleteFormFlag = false;
    }
  }
}
