import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { UserService } from '../services/user.service';
import { UserActions } from './user.actions';

@Injectable()
export class UserEffects {
  getCurrentUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.requestCurrentUser),
      mergeMap(() =>
        this.userService.getUser().pipe(
          map(user =>
            UserActions.requestCurrentUserSuccess({
              isAdmin: user.role === 'admin',
              name: user.name ? user.name : '',
            })
          ),
          catchError(() => of(UserActions.requestCurrentUserError()))
        )
      )
    );
  });

  constructor(private actions$: Actions, private userService: UserService) {}
}
