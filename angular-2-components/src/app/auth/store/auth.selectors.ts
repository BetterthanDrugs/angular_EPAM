import { createFeatureSelector, createSelector } from '@ngrx/store';

import { authFeatureKey, AuthState } from './auth.reducer';

export namespace AuthSelectors {
  const selectUser = createFeatureSelector<AuthState>(authFeatureKey);

  export const selectIsAuthorized = createSelector(selectUser, (state: AuthState) => state.isAuthorized);
  export const selectToken = createSelector(selectUser, (state: AuthState) => state.token);
  export const selectErrorMessageLogin = createSelector(selectUser, (state: AuthState) => state.errorMessageLogin);
  export const selectIsRegistered = createSelector(selectUser, (state: AuthState) => state.isRegistered);
}
