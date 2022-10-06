import { Component } from '@angular/core';
import { ROUTS_LIST, Account, ACCOUNT_DEFAULT } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  TEMPLATE_ROUTS_LIST = ROUTS_LIST;
  currentRoute: ROUTS_LIST = ROUTS_LIST.LOGIN_PAGE;
  account: Account = ACCOUNT_DEFAULT;

  handleRoute(route: ROUTS_LIST) {
    this.currentRoute = route;
  }

  handleLogin(account: Account) {
    this.account = account;
  }

  handleRegistration(account: Account) {
    this.account = account;
  }
}
