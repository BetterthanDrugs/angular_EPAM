import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Course } from '../courses/courses.model';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Account } from '../../app.model';
import { UserStateFacade } from 'src/app/user/store/user.facade';
import { CoursesStateFacade } from 'src/app/store/courses/courses.facade';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})

export class CourseListComponent implements OnInit, OnDestroy {
  iconButtonEdit = faPencil;
  iconButtonDelete = faTrash;
  private readonly destroy$ = new ReplaySubject(1);

  courses = this.coursesStateFacade.courses$;
  showModalInfoFlag = false;
  showEditFormFlag = false;
  showDeleteFormFlag = false;
  isAdmin = this.userStateFacade.isAdmin$;
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
    private userStateFacade: UserStateFacade,
    private coursesStateFacade: CoursesStateFacade,
  ) {
    this.account = this.authService.getUser();
  }

  ngOnInit(): void {
    this.coursesStateFacade.getCourses();
  }

  ngOnDestroy(): void {
    this.destroy$.next(() => {});
    this.destroy$.complete();
  }

  searchCourse(title: any): void {
    this.coursesStateFacade.getFilteredCourses(title);
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
      this.coursesStateFacade.deleteCourse(this.modalObj);
      this.showDeleteFormFlag = false;
    }
  }
}
