import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {
  ROUTS_LIST,
  passwordView,
  randomInteger,
  TEMPLATE_STRINGS,
  HIDE_PASSWORD_FLAG,
  HIDDEN_PASSWORD_INPUT_TYPE,
  NOT_HIDDEN_PASSWORD_INPUT_TYPE,
  LOWER_THRESHOLD_FOR_RANDOM_ID,
  UPPER_THRESHOLD_FOR_RANDOM_ID,
  LOGIN_RQ_STATUS,
} from 'src/app/app.model';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  currentEyeIcon = faEye;
  currentPasswordInputType = HIDDEN_PASSWORD_INPUT_TYPE;
  hidePasswordFlag = HIDE_PASSWORD_FLAG;
  registrationTemplateStrings = TEMPLATE_STRINGS;
  formDataRegistration: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  showModalFlag = false;
  currentRouterUrl = ROUTS_LIST.REGISTRATION_PAGE;
  modalMessage = '';

  constructor(private _authService: AuthService, private _router: Router) {}

  routerPushButtonEvent(): void {
    this.showModalFlag = false;
    this._router.navigateByUrl(this.currentRouterUrl);
  }

  @Output() navigateEvent = new EventEmitter();
  @Output() registrationEvent = new EventEmitter();

  get name(): any {
    return this.formDataRegistration.get('name');
  }

  get email(): any {
    return this.formDataRegistration.get('email');
  }

  get password(): any {
    return this.formDataRegistration.get('password');
  }

  onSubmit(): void {
    if (!this.formDataRegistration.valid) {
      this.formDataRegistration.markAllAsTouched();
    } else {
      this._authService.register(this.formDataRegistration.value).subscribe({
        next: () => {
          this.currentRouterUrl = ROUTS_LIST.LOGIN_PAGE;
          this.modalMessage = LOGIN_RQ_STATUS.RQ_SUCCESS;
          this.showModalEvent(this.modalMessage);
        },
        error: () => {
          this.currentRouterUrl = ROUTS_LIST.REGISTRATION_PAGE;
          this.modalMessage = LOGIN_RQ_STATUS.BAD_RQ_ERROR;
          this.showModalEvent(this.modalMessage);
        },
      });
    }
  }

  navigateToLogin(event: Event) {
    event.preventDefault();
    this.currentRouterUrl = ROUTS_LIST.LOGIN_PAGE;
    this._router.navigateByUrl(this.currentRouterUrl);
  }

  passwordViewRegistration(): void {
    this.hidePasswordFlag = passwordView(this.hidePasswordFlag);
    this.currentEyeIcon = this.hidePasswordFlag ? faEye : faEyeSlash;
    this.currentPasswordInputType = this.hidePasswordFlag
      ? HIDDEN_PASSWORD_INPUT_TYPE
      : NOT_HIDDEN_PASSWORD_INPUT_TYPE;
  }

  showModalEvent(message: string): void {
    this.showModalFlag = true;
    this.modalMessage = message;
  }
}
