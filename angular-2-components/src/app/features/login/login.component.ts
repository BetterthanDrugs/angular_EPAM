import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import {
  Account,
  ACCOUNT_MOCK_DATA,
  HIDE_PASSWORD_FLAG,
  ROUTS_LIST,
} from '../../app.model';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  eyeIcon = faEye;
  eyeSlashIcon = faEyeSlash;
  @ViewChild('loginForm') loginForm: any;
  formData: Account = ACCOUNT_MOCK_DATA;
  hidePasswordFlag = HIDE_PASSWORD_FLAG;
  @Output() navigateEvent = new EventEmitter();
  @Output() loginEvent = new EventEmitter();

  login() {
    if (this.loginForm.form.status === 'VALID') {
      this.loginEvent.emit(this.formData);
      this.navigateEvent.emit(ROUTS_LIST.COURSES_PAGE);
    }
  }

  passwordView() {
    this.hidePasswordFlag = !this.hidePasswordFlag;
  }
}
