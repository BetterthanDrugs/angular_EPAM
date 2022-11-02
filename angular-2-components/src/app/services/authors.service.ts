import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Author, BACK_END_SOURCE_URL, Request200, Request400 } from '../app.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Author[]> {
    return this.http
      .get<Request200<Author[]>>(`${BACK_END_SOURCE_URL}/authors/all`)
      .pipe(map(response => response.result));
  }

  addAuthor(author: Author): Observable<Author> {
    return this.http.post<Request200<Author>>(`${BACK_END_SOURCE_URL}/authors/add`, author).pipe(
      map(response => response.result)
    );
  }

  deleteAuthor(author: Author): Observable<Request400 | {}> {
    return this.http.delete(`${BACK_END_SOURCE_URL}/authors/${author.id}`);
  }
}
