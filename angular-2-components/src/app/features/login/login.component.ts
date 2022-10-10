import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import {
  ACCOUNT_MOCK_DATA,
  HIDE_PASSWORD_FLAG,
  HIDDEN_PASSWORD_INPUT_TYPE,
  NOT_HIDDEN_PASSWORD_INPUT_TYPE,
  ROUTS_LIST,
  passwordView,
  TEMPLATE_STRINGS,
} from '../../app.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  currentEyeIcon = faEye;
  currentPasswordInputType = HIDDEN_PASSWORD_INPUT_TYPE;
  hidePasswordFlag = HIDE_PASSWORD_FLAG;
  loginTemplateStrings = TEMPLATE_STRINGS;
  formDataLogin: FormGroup = new FormGroup({
    account_nickname: new FormControl(ACCOUNT_MOCK_DATA.account_nickname),
    account_email: new FormControl(ACCOUNT_MOCK_DATA.account_email),
    account_password: new FormControl(ACCOUNT_MOCK_DATA.account_password),
    account_id: new FormControl(ACCOUNT_MOCK_DATA.account_id),
    account_status: new FormControl(ACCOUNT_MOCK_DATA.account_status),
  });

  findInvalidControls() {
    const invalid = [];
    const controls = this.formDataLogin.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  ngOnInit() {
    console.log('invalid: ', this.findInvalidControls());
    console.log('FORM: ', this.formDataLogin);
  }

  @Output() navigateEvent = new EventEmitter();
  @Output() loginEvent = new EventEmitter();

  get account_email(): any {
    return this.formDataLogin.get('account_email');
  }

  get account_password(): any {
    return this.formDataLogin.get('account_password');
  }

  onSubmit(): void {
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

  passwordViewLogin(): void {
    this.hidePasswordFlag = passwordView(this.hidePasswordFlag);
    this.currentEyeIcon = this.hidePasswordFlag ? faEye : faEyeSlash;
    this.currentPasswordInputType = this.hidePasswordFlag
      ? HIDDEN_PASSWORD_INPUT_TYPE
      : NOT_HIDDEN_PASSWORD_INPUT_TYPE;
  }
}
