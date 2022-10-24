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
import { ReplaySubject } from 'rxjs';
import { CoursesStoreService } from '../../services/courses-store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit, OnDestroy {
  infoMessage = INFO_MESSAGE;
  courses: Course[] = COURSES;
  showAddFormFlag = false;
  addFormButtonSubmitText = 'Add Course';
  private readonly destroy$ = new ReplaySubject(1);
  isLoading: boolean = false;
  modalObj: Course = {
    id: '',
    title: '',
    description: '',
    creationDate: '',
    duration: 0,
    authors: [],
  };
  buttonLogoutText = 'Logout';
  filterValue = '';
  account: Account;
  @Output() navigateEvent = new EventEmitter();

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _courseStoreService: CoursesStoreService
  ) {
    this.account = this._authService.getUser();
  }

  addCourseFunction(): void {
    this.showAddFormFlag = true;
    console.log('add test');
  }

  logoutFunction(): void {
    console.log('logout test');
    this._authService.logout();
    this._router.navigateByUrl(ROUTS_LIST.LOGIN_PAGE);
  }

  ngOnInit(): void {
    console.log('isLoading');
  }

  ngOnDestroy(): void {
    this.destroy$.next(() => {});
    this.destroy$.complete();
  }
}
