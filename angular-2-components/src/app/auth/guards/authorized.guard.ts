import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  authStatusFlag = false;

  canLoad():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.authService.authStatusFlag.subscribe(authStatus => {
      this.authStatusFlag = authStatus;
    });
    if (this.authStatusFlag) {
      return true;
    }
    return this.router.createUrlTree(['/login']);
  }
}
