import { Component } from '@angular/core';
import { ROUTS_LIST } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  TEMPLATE_ROUTS_LIST = ROUTS_LIST;
  currentRoute: ROUTS_LIST = ROUTS_LIST.COURSES_PAGE;

  handleRoute(route: ROUTS_LIST) {
    this.currentRoute = route;
  }
}
