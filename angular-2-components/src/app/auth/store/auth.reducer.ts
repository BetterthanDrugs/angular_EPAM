import { Action, createReducer, on } from '@ngrx/store';

import { AuthActions } from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  isAuthorized: boolean;
  isRegistered: boolean;
  token: string;
  errorMessageLogin: string;
}

export const initialState: AuthState = {
  isAuthorized: false,
  isRegistered: false,
  token: '',
  errorMessageLogin: '',
};

const reducer = createReducer(
  initialState,
  on(AuthActions.requestLogin, (state): AuthState => ({ ...state })),
  on(
    AuthActions.requestLoginSuccess,
    (state, { token }): AuthState => ({ ...state, token, isAuthorized: true, errorMessageLogin: '' })
  ),
  on(
    AuthActions.requestLoginError,
    (state, { errorMessageLogin }): AuthState => ({ ...state, errorMessageLogin, isAuthorized: false })
  ),

  on(AuthActions.requestLogout, (state): AuthState => ({ ...state, isAuthorized: false })),

  on(AuthActions.requestRegister, (state): AuthState => ({ ...state })),
  on(
    AuthActions.requestRegisterSuccess,
    (state): AuthState => ({ ...state, isRegistered: true })
  ),
  on(
    AuthActions.requestRegisterError,
    (state, { errorMessageRegister }): AuthState => ({ ...state, isRegistered: false })
  )
);

export const authReducer = (state: AuthState | undefined, action: Action): AuthState => reducer(state, action);
