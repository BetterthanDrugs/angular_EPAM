import { createAction, props } from '@ngrx/store';
import { Author } from 'src/app/app.model';

export namespace AuthorsActions {
  export const requestAuthors = createAction('Authors$: request authors');
  export const requestAuthorsSuccess = createAction('Authors$: request authors success', props<{ authors: Author[] }>());
  export const requestAuthorsError = createAction('Authors$: request authors error');


  export const requestAddAuthor = createAction('Authors$: request add author', props<{ author: Author }>());
  export const requestAddAuthorSuccess = createAction('Authors$: request add author success', props<{ author: Author }>());
  export const requestAddAuthorError = createAction('Authors$: request add author error');

  
  export const requestDeleteAuthor = createAction('Authors$: request delete author', props<{ author: Author }>());
  export const requestDeleteAuthorSuccess = createAction('Authors$: request delete author success');
  export const requestDeleteAuthorError = createAction('Authors$: request delete author error');
}
