import { createAction, props } from '@ngrx/store';
import { Account } from 'src/app/app.model';

export namespace AuthActions {
  export const requestLogin = createAction('Auth$: request login', props<{ user: Account }>());
  export const requestLoginSuccess = createAction('Auth$: request login success', props<{ token: string }>());
  export const requestLoginError = createAction('Auth$: request login error', props<{ errorMessageLogin: string }>());


  export const requestRegister = createAction('Auth$: request register', props<{ user: Account }>());
  export const requestRegisterSuccess = createAction('Auth$: request register success', props<{ user: Account }>());
  export const requestRegisterError = createAction('Auth$: request register error', props<{ errorMessageRegister: string }>());


  export const requestLogout = createAction('Auth$: request logout');
  export const requestLogoutSuccess = createAction('Auth$: request logout success');
}
