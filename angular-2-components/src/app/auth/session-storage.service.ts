import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  private window: Window | null;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.window = this.document.defaultView;
  }

  setToken(token: string): void {
    sessionStorage.setItem('token', JSON.stringify(token));
  }

  getToken(): string {
    return JSON.parse(sessionStorage.getItem('token') || '{}');
  }

  deleteToken(): void {
    sessionStorage.removeItem('token');
  }
}
