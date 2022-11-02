import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  finalize,
  map,
  Observable,
  of,
  tap,
} from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { Account, ACCOUNT_MOCK_REG_DATA, BACK_END_SOURCE_URL } from '../app.model';
import {UserStoreService} from "../user/services/user-store.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStatus = new BehaviorSubject<boolean>(false);
  readonly authStatusFlag: Observable<boolean> = this.authStatus.asObservable();
  account: Account = ACCOUNT_MOCK_REG_DATA;

  private isLoading$$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private storage: SessionStorageService,
    private userStoreService: UserStoreService
  ) {}

  getUser() {
    return this.account;
  }

  login(account: Account): Observable<any> {
    return this.http.post(`${BACK_END_SOURCE_URL}/login`, account).pipe(
      tap((response: any) => {
        if (response.successful === true && response.result !== undefined) {
          const token = response.result;
          this.authStatus.next(true);
          this.storage.setToken(token);
          this.account.accessToken = token;
          return this.userStoreService.getUser();
        } else {
          return;
        }
      })
    );
  }

  logout(): Observable<any> {
    const token = this.storage.getToken();
    return this.http
      .delete(`${BACK_END_SOURCE_URL}/logout`, {
        headers: {
          Authorization: token,
        },
      })
      .pipe(
        tap(() => {
          this.authStatus.next(false);
          this.storage.deleteToken();
        })
      );
  }

  register(account: Account): Observable<any> {
    return this.http.post(`${BACK_END_SOURCE_URL}/register`, account).pipe(
      finalize(() => {
        console.log('finalize');
      }),
      catchError(({ error }) => of(error)),
      map(response => {
        if (response.successful === true) {
          this.account = { ...account };
        }
      })
    );
  }
}
