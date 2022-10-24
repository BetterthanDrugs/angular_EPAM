import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable, tap } from 'rxjs';
import { Author, Request200, Request400 } from '../app.model';
import { AuthorsService } from './authors.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorsStoreService {
  private authors$$ = new BehaviorSubject<Author[]>([]);
  authors$: Observable<Author[]> = this.authors$$.asObservable();

  private isLoading$$ = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoading$$.asObservable();

  constructor(private authorService: AuthorsService) {}

  getAll(): Observable<Author[]> {
    this.isLoading$$.next(true);
    return this.authorService.getAll().pipe(
      finalize(() => this.isLoading$$.next(false)),
      tap(authors => this.authors$$.next(authors))
    );
  }

  addAuthor(author: Author): Observable<Request200<Author> | Request400> {
    return this.authorService.addAuthor(author);
  }

  deleteAuthor(author: Author): Observable<Request400 | {}> {
    return this.authorService.deleteAuthor(author);
  }
}
