import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { UserStoreService } from '../services/user-store.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  isAdmin = false;

  constructor(
    private userStoreService: UserStoreService,
    private router: Router
  ) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.userStoreService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = !!isAdmin;
    });
    if (this.isAdmin) {
      return true;
    }

    return this.router.createUrlTree(['/courses']);
  }
}
