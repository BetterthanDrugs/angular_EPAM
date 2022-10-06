import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {
  ROUTS_LIST,
  passwordView,
  randomInteger,
  HIDE_PASSWORD_FLAG,
} from 'src/app/app.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  eyeIcon = faEye;
  eyeSlashIcon = faEyeSlash;
  hidePasswordFlag = HIDE_PASSWORD_FLAG;
  formDataRegistration: FormGroup = new FormGroup({
    account_nickname: new FormControl(''),
    account_email: new FormControl(''),
    account_password: new FormControl(''),
    //todo как можно еще определить значения, которых нет в template,
    // но должны быть в formData?
    account_id: new FormControl(''),
    account_status: new FormControl(''),
  });

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

  onSubmit() {
    if (!this.formDataRegistration.valid) {
      this.formDataRegistration.markAllAsTouched();
    } else {
      this.formDataRegistration.patchValue({
        account_id: randomInteger(1, 15),
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

  //todo не уверен, что правильно переиспользую функцию
  // из другого модуля для template текущего компонента
  passwordViewRegistration() {
    passwordView(this.hidePasswordFlag);
  }
}
