import { createAction, props } from '@ngrx/store';

export namespace UserActions {
  export const requestCurrentUser = createAction('User$: request current user');
  export const requestCurrentUserSuccess = createAction(
    'User$: request current User success',
    props<{ isAdmin: boolean; name: string }>()
  );
  export const requestCurrentUserError = createAction(
    '$User$: request current User error'
  );
}
