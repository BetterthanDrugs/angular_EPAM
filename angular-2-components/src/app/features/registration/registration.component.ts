import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
} from 'src/app/app.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  currentEyeIcon = faEye;
  currentPasswordInputType = HIDDEN_PASSWORD_INPUT_TYPE;
  hidePasswordFlag = HIDE_PASSWORD_FLAG;
  registrationTemplateStrings = TEMPLATE_STRINGS;
  formDataRegistration: FormGroup = new FormGroup({
    account_nickname: new FormControl(''),
    account_email: new FormControl(''),
    account_password: new FormControl(''),
    account_id: new FormControl(''),
    account_status: new FormControl(''),
  });

  findInvalidControls() {
    const invalid = [];
    const controls = this.formDataRegistration.controls;
    for (const name in controls) {
      console.log('contr: ', controls[name].invalid);
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  ngOnInit() {
    console.log('invalid: ', this.findInvalidControls());
    console.log('FORM: ', this.formDataRegistration);
  }

  @Output() navigateEvent = new EventEmitter();
  @Output() registrationEvent = new EventEmitter();

  get account_nickname(): any {
    return this.formDataRegistration.get('account_nickname');
  }

  get account_email(): any {
    return this.formDataRegistration.get('account_email');
  }

  get account_password(): any {
    return this.formDataRegistration.get('account_password');
  }

  onSubmit(): void {
    if (!this.formDataRegistration.valid) {
      this.formDataRegistration.markAllAsTouched();
    } else {
      this.formDataRegistration.patchValue({
        account_id: randomInteger(
          LOWER_THRESHOLD_FOR_RANDOM_ID,
          UPPER_THRESHOLD_FOR_RANDOM_ID
        ),
        account_status: 'default user',
      });
      this.registrationEvent.emit(this.formDataRegistration.value);
      this.navigateEvent.emit(ROUTS_LIST.COURSES_PAGE);
    }
  }

  navigateToLogin(event: Event) {
    event.preventDefault();
    this.navigateEvent.emit(ROUTS_LIST.LOGIN_PAGE);
  }

  passwordViewRegistration(): void {
    this.hidePasswordFlag = passwordView(this.hidePasswordFlag);
    this.currentEyeIcon = this.hidePasswordFlag ? faEye : faEyeSlash;
    this.currentPasswordInputType = this.hidePasswordFlag
      ? HIDDEN_PASSWORD_INPUT_TYPE
      : NOT_HIDDEN_PASSWORD_INPUT_TYPE;
  }
}
