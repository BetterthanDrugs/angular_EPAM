import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Course, COURSES, INFO_MESSAGE } from './courses.model';
import { Account, ACCOUNT_DEFAULT, ROUTS_LIST } from '../../app.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent {
  infoMessage = INFO_MESSAGE;
  courses: Course[] = COURSES;
  buttonText = 'Logout';
  @Input() account: Account = ACCOUNT_DEFAULT;
  @Output() navigateEvent = new EventEmitter();

  addCourseFunction() {
    console.log('add test');
  }
  constructor() {
  }

  logoutFunction(): void {
    console.log('logout test');
    this.navigateEvent.emit(ROUTS_LIST.LOGIN_PAGE);
  }
}
