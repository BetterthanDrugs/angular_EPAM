import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthSelectors } from './auth.selectors';
import { AuthActions } from './auth.actions';
import { SessionStorageService } from '../session-storage.service';
import { Account } from 'src/app/app.model';

@Injectable()
export class AuthStateFacade {
  isAuthorized$ = this.store.select(AuthSelectors.selectIsAuthorized);
  isRegistered$ = this.store.select(AuthSelectors.selectIsRegistered);
  errorMessageLogin$ = this.store.select(AuthSelectors.selectErrorMessageLogin);
  token$ = this.store.select(AuthSelectors.selectToken);

  constructor(private store: Store, private sessionStorageService: SessionStorageService) {}

  login(user: Account): void {
    this.store.dispatch(AuthActions.requestLogin({ user }));
  }

  logout(): void {
    this.store.dispatch(AuthActions.requestLogout());
  }

  setAuthorization(): void {
    this.store.dispatch(AuthActions.requestLoginSuccess({ token: this.sessionStorageService.getToken() }));
  }

  register(user: Account): void {
    this.store.dispatch(AuthActions.requestRegister({ user }));
  }

  closeSession(): void {
    this.store.dispatch(AuthActions.requestLogoutSuccess());
  }
}
