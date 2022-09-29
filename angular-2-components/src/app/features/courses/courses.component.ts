import { Component } from '@angular/core';
import { Course, User, INFO_MESSAGE, COURSES } from './courses.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  infoMessage = INFO_MESSAGE;
  courses: Course[] = COURSES;
  buttonText = 'Logout';
  user: User = { name: 'Tester' };

  addCourseFunction() {
    console.log('add test');
  }

  logoutFunction(): void {
    console.log('logout test');
  }
}
