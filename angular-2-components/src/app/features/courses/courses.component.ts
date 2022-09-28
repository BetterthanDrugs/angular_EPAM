import { Component } from '@angular/core';
import { Course, User, INFO_MESSAGE, COURSES } from './courses.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  public infoMessage = INFO_MESSAGE;
  public courses: Course[] = COURSES;
  public buttonText = 'Logout';
  public user: User = { name: 'Tester' };

  addCourseFunction() {
    console.log('add test');
  }

  logoutFunction(): void {
    console.log('logout test');
  }
}
