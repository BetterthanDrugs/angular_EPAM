import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Course, COURSES, INFO_MESSAGE } from './courses.model';
import { Account, ACCOUNT_DEFAULT, ROUTS_LIST } from '../../app.model';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { CoursesStoreService } from '../../services/courses-store.service';
import { UserStoreService } from '../../user/services/user-store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit, OnDestroy {
  showAddFormFlag = false;
  isLoading: boolean = false;
  isAdmin: undefined | boolean = true;
  isEditForm: boolean = false;
  addFormButtonSubmitText = 'Add Course';
  buttonLogoutText = 'Logout';
  infoMessage = INFO_MESSAGE;
  filterValue = '';
  private readonly destroy$ = new ReplaySubject(1);
  modalObj: Course = {
    id: '',
    title: '',
    description: '',
    duration: 0,
    authors: [],
  };
  courses: Course[] = COURSES;
  account: Account;
  @Output() navigateEvent = new EventEmitter();

  constructor(
    private router: Router,
    private authService: AuthService,
    private courseStoreService: CoursesStoreService,
    private userStoreService: UserStoreService
  ) {
    this.account = this.authService.getUser();
  }

  addCourseFunction(): void {
    this.showAddFormFlag = true;
    console.log('add test');
  }

  logoutFunction(): void {
    console.log('logout test');
    this.authService
      .logout()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.router.navigateByUrl(ROUTS_LIST.LOGIN_PAGE));
  }

  ngOnInit(): void {
    console.log('isLoading');
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
}
