import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import {
  ACCOUNT_MOCK_DATA,
  HIDE_PASSWORD_FLAG,
  ROUTS_LIST,
  passwordView,
} from '../../app.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  eyeIcon = faEye;
  eyeSlashIcon = faEyeSlash;
  hidePasswordFlag = HIDE_PASSWORD_FLAG;
  formDataLogin: FormGroup = new FormGroup({
    account_nickname: new FormControl(ACCOUNT_MOCK_DATA.account_nickname),
    account_email: new FormControl(ACCOUNT_MOCK_DATA.account_email),
    account_password: new FormControl(ACCOUNT_MOCK_DATA.account_password),
    account_id: new FormControl(ACCOUNT_MOCK_DATA.account_id),
    account_status: new FormControl(ACCOUNT_MOCK_DATA.account_status),
  });

  @Output() navigateEvent = new EventEmitter();
  @Output() loginEvent = new EventEmitter();

  get account_email(): any {
    return this.formDataLogin.get('account_email');
  }

  get account_password(): any {
    return this.formDataLogin.get('account_password');
  }

  onSubmit() {
    if (this.formDataLogin.valid) {
      this.loginEvent.emit(this.formDataLogin.value);
      this.navigateEvent.emit(ROUTS_LIST.COURSES_PAGE);
    } else {
      this.formDataLogin.markAllAsTouched();
    }
  }

  navigateToRegistration(event: Event) {
    event.preventDefault();
    this.navigateEvent.emit(ROUTS_LIST.REGISTRATION_PAGE);
  }

  //todo не уверен, что правильно переиспользую функцию
  // из другого модуля для template текущего компонента
  passwordViewLogin() {
    passwordView(this.hidePasswordFlag);
  }
}
