import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Course, COURSES, INFO_MESSAGE } from './courses.model';
import { Account, ROUTS_LIST } from '../../app.model';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { AuthStateFacade } from 'src/app/auth/store/auth.facade';
import { UserStateFacade } from 'src/app/user/store/user.facade';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnDestroy {
  showAddFormFlag = false;
  isLoading: boolean = false;
  isEditForm: boolean = false;
  addFormButtonSubmitText = 'Add Course';
  buttonLogoutText = 'Logout';
  infoMessage = INFO_MESSAGE;
  filterValue = '';
  private readonly destroy$ = new ReplaySubject(1);
  isAdmin = this.userStateFacade.isAdmin$;
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
    private userStateFacade: UserStateFacade,
    private authStateFacade: AuthStateFacade,
  ) {
    this.account = this.authService.getUser();
  }

  addCourseFunction(): void {
    this.showAddFormFlag = true;
  }

  logoutFunction(): void {
    this.authService
      .logout()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
    this.authStateFacade.logout();
    this.router.navigateByUrl(ROUTS_LIST.LOGIN_PAGE)
  }

  ngOnDestroy(): void {
    this.destroy$.next(() => {});
    this.destroy$.complete();
  }
}
