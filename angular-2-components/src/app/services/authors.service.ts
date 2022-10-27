import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Author, Request200, Request400 } from '../app.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Author[]> {
    return this.http
      .get<Request200<Author[]>>('http://localhost:4000/authors/all')
      .pipe(map(response => response.result));
  }

  addAuthor(author: Author): Observable<Request200<Author> | Request400> {
    return this.http.post<Request200<Author> | Request400>(
      'http://localhost:4000/authors/add',
      author
    );
  }

  deleteAuthor(author: Author): Observable<Request400 | {}> {
    return this.http.delete(`http://localhost:4000/authors/${author.id}`);
  }
}
