import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { AuthActions } from './auth.actions';
import { Request200, Request400 } from 'src/app/app.model';


@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.requestLogin),
      mergeMap(({ user }) =>
        this.authService.login(user).pipe(
          map(token => AuthActions.requestLoginSuccess({ token })),
          catchError(({ error }: { error: Request200<string> }) => {
            return of(AuthActions.requestLoginError({ errorMessageLogin: error.result }));
          })
        )
      )
    );
  });

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.requestRegister),
      mergeMap(({ user }) =>
        this.authService.register(user).pipe(
          map(user => AuthActions.requestRegisterSuccess({ user })),
          catchError(({ error }: { error: Request400 }) => {
            return of(AuthActions.requestRegisterError({ errorMessageRegister: error.errors?.[0] || '' }));
          })
        )
      )
    );
  });

  constructor(private actions$: Actions, private authService: AuthService) {}
}
