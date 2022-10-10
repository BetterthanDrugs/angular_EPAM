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
  buttonLogoutText = 'Logout';
  filterValue = '';
  @Input() account: Account = ACCOUNT_DEFAULT;
  @Output() navigateEvent = new EventEmitter();

  addCourseFunction(): void {
    console.log('add test');
  }
  constructor() {}

  logoutFunction(): void {
    console.log('logout test');
    this.navigateEvent.emit(ROUTS_LIST.LOGIN_PAGE);
  }

  searchCourse(courseName: string): void {
    console.log('search course test');
    this.filterValue = courseName;
  }

  get coursesByFilter(): Course[] {
    return this.courses.filter(course =>
      course.title.match(new RegExp(this.filterValue, 'i'))
    );
  }
}
