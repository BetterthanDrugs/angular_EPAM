import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import {
  HIDE_PASSWORD_FLAG,
  HIDDEN_PASSWORD_INPUT_TYPE,
  NOT_HIDDEN_PASSWORD_INPUT_TYPE,
  passwordView,
  ROUTS_LIST,
  TEMPLATE_STRINGS,
  ACCOUNT_MOCK_REG_DATA,
  LOGIN_RQ_STATUS,
} from '../../app.model';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

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
    name: new FormControl(ACCOUNT_MOCK_REG_DATA.name),
    email: new FormControl(ACCOUNT_MOCK_REG_DATA.email),
    password: new FormControl(ACCOUNT_MOCK_REG_DATA.password),
  });
  currentRouterUrl = ROUTS_LIST.LOGIN_PAGE;
  showModalFlag = false;
  modalMessage = '';

  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this._authService.authStatusFlag.subscribe(authStatusFlag => {
      if (authStatusFlag) {
        console.log('isAuthorized');
        this.currentRouterUrl = ROUTS_LIST.COURSES_PAGE;
        this.modalMessage = LOGIN_RQ_STATUS.RQ_SUCCESS;
      } else {
        console.log('isNotAuthorized');
        this.currentRouterUrl = ROUTS_LIST.LOGIN_PAGE;
        this.modalMessage = LOGIN_RQ_STATUS.BAD_RQ_ERROR;
      }
    });
  }

  @Output() navigateEvent = new EventEmitter();
  @Output() loginEvent = new EventEmitter();

  get email(): any {
    return this.formDataLogin.get('email');
  }

  get password(): any {
    return this.formDataLogin.get('password');
  }

  routerPushButtonEvent(): void {
    this.showModalFlag = false;
    this._router.navigateByUrl(this.currentRouterUrl);
  }

  onSubmit(): void {
    if (this.formDataLogin.valid) {
      this._authService.login(this.formDataLogin.value);
      this.showModalEvent(this.modalMessage);
    } else {
      this.formDataLogin.markAllAsTouched();
    }
  }

  navigateToRegistration(event: Event) {
    event.preventDefault();
    this.currentRouterUrl = ROUTS_LIST.REGISTRATION_PAGE;
    this._router.navigateByUrl(this.currentRouterUrl);
  }

  passwordViewLogin(): void {
    this.hidePasswordFlag = passwordView(this.hidePasswordFlag);
    this.currentEyeIcon = this.hidePasswordFlag ? faEye : faEyeSlash;
    this.currentPasswordInputType = this.hidePasswordFlag
      ? HIDDEN_PASSWORD_INPUT_TYPE
      : NOT_HIDDEN_PASSWORD_INPUT_TYPE;
  }

  showModalEvent(message: string): void {
    console.log('showModalEvent');
    this.showModalFlag = true;
    this.modalMessage = message;
  }
}
