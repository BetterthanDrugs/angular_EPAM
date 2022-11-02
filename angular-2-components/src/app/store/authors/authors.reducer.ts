import { Action, createReducer, on } from '@ngrx/store';
import { Author } from 'src/app/app.model';
import { AuthorsActions } from './authors.actions';

export const authorsFeatureKey = 'authors';

export interface AuthorsState {
  authors: Author[];
}

export const initialState: AuthorsState = {
  authors: [],
};

const reducer = createReducer(
  initialState,
  on(AuthorsActions.requestAuthors, (state): AuthorsState => ({ ...state })),
  on(
    AuthorsActions.requestAuthorsSuccess,
    (state, { authors }): AuthorsState => ({ ...state, authors: authors })
  ),
  on(AuthorsActions.requestAuthorsError, (state): AuthorsState => ({ ...state })),

  on(AuthorsActions.requestAddAuthor, (state): AuthorsState => ({ ...state })),
  on(AuthorsActions.requestAddAuthorSuccess, (state, { author }): AuthorsState => ({ ...state })),
  on(AuthorsActions.requestAddAuthorError, (state): AuthorsState => ({ ...state })),

  on(AuthorsActions.requestDeleteAuthor, (state): AuthorsState => ({ ...state })),
  on(AuthorsActions.requestDeleteAuthorSuccess, (state): AuthorsState => ({ ...state })),
  on(AuthorsActions.requestAddAuthorError, (state): AuthorsState => ({ ...state }))
);

export const authorsReducer = (state: AuthorsState | undefined, action: Action): AuthorsState => reducer(state, action);
