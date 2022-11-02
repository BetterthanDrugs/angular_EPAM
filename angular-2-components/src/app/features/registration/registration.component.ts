import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {
  ROUTS_LIST,
  passwordView,
  TEMPLATE_STRINGS,
  HIDE_PASSWORD_FLAG,
  HIDDEN_PASSWORD_INPUT_TYPE,
  NOT_HIDDEN_PASSWORD_INPUT_TYPE,
  LOGIN_RQ_STATUS,
} from 'src/app/app.model';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { AuthStateFacade } from 'src/app/auth/store/auth.facade';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnDestroy {
  currentEyeIcon = faEye;
  currentPasswordInputType = HIDDEN_PASSWORD_INPUT_TYPE;
  private readonly destroy$ = new ReplaySubject(1);
  hidePasswordFlag = HIDE_PASSWORD_FLAG;
  isRegistered = this.authStateFacade.isRegistered$;
  registrationTemplateStrings = TEMPLATE_STRINGS;
  formDataRegistration: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  showModalFlag = false;
  currentRouterUrl = ROUTS_LIST.REGISTRATION_PAGE;
  modalMessage = '';

  constructor(private _router: Router, private authStateFacade: AuthStateFacade) {}

  ngOnDestroy(): void {
    this.destroy$.next(() => {});
    this.destroy$.complete();
  }

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
      this.authStateFacade.register(this.formDataRegistration.value);
      if (this.isRegistered) {
        this.currentRouterUrl = ROUTS_LIST.LOGIN_PAGE;
          this.modalMessage = LOGIN_RQ_STATUS.RQ_SUCCESS;
          this.showModalEvent(this.modalMessage);
      } else {
        this.currentRouterUrl = ROUTS_LIST.REGISTRATION_PAGE;
          this.modalMessage = LOGIN_RQ_STATUS.BAD_RQ_ERROR;
          this.showModalEvent(this.modalMessage);
      }
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
