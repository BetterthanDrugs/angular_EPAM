import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Request200, Account, BACK_END_SOURCE_URL } from '../../app.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<Account> {
    return this.http
      .get<Request200<Account>>(`${BACK_END_SOURCE_URL}/users/me`)
      .pipe(map(response => response.result));
  }
}
