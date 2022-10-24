import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Account } from '../../app.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private name$$ = new BehaviorSubject<string | undefined>('');
  readonly name$: Observable<string | undefined> = this.name$$.asObservable();

  private isAdmin$$ = new BehaviorSubject<boolean | undefined>(false);
  readonly isAdmin$: Observable<boolean | undefined> =
    this.isAdmin$$.asObservable();

  constructor(private userService: UserService) {}

  getUser(): Observable<Account> {
    return this.userService.getUser().pipe(
      tap(user => {
        this.name$$.next(user.name);
        this.isAdmin$$.next(user.role === 'admin');
      })
    );
  }
}
