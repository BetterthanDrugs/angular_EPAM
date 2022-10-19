import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  finalize,
  map,
  Observable,
  of,
} from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { Account, ACCOUNT_MOCK_REG_DATA } from '../../app.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStatus = new BehaviorSubject<boolean>(false);
  readonly authStatusFlag: Observable<boolean> = this.authStatus.asObservable();
  account: Account = ACCOUNT_MOCK_REG_DATA;
  registrationStatus: boolean = false;

  constructor(
    private _http: HttpClient,
    private _storage: SessionStorageService
  ) {}

  getUser() {
    return this.account;
  }

  login(account: Account) {
    this._http
      .post('http://localhost:4000/login', account)
      .pipe(
        finalize(() => {
          console.log('finalize');
        }),
        catchError(({ error }) => of(error))
      )
      .subscribe((response: any) => {
        if (response.successful === true && response.result !== undefined) {
          const token = response.result;
          this.authStatus.next(true);
          this._storage.setToken(token);
          this.account.accessToken = token;
        }
      });
  }

  logout(): void {
    const token = this._storage.getToken();
    this._http
      .delete('http://localhost:4000/logout', {
        headers: {
          Authorization: token,
        },
      })
      .subscribe(() => {
        this.authStatus.next(false);
        this._storage.deleteToken();
      });
  }

  register(account: Account): Observable<any> {
    return this._http.post('http://localhost:4000/register', account).pipe(
      finalize(() => {
        console.log('finalize');
      }),
      catchError(({ error }) => of(error)),
      map(response => {
        if (response.successful === true) {
          this.account = { ...account };
          this.registrationStatus = true;
          return true;
        } else {
          this.registrationStatus = false;
          return false;
        }
      })
    );
  }
}
