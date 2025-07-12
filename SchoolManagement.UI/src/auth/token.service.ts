import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IlN1ZGhha2FyIE1hbGxhcmVkZHkiLCJVc2VySWQiOiIzIiwiUm9sZUlkIjoiMyIsIlJvbGVOYW1lIjoiUGFyZW50IiwiU2Nob29sSWQiOiJNYW5hZ2UiLCJVc2VyQnJhbmNoZXMiOiIyIiwibmJmIjoxNzUwNzQ5MTEwLCJleHAiOjE3ODIyODUxMTAsImlhdCI6MTc1MDc0OTExMH0.GNzq51kwzkfL9PyZjnD9ND7ADFDYI8mfWplLPsDQVFc';
      //return localStorage.getItem('authToken');
    }
    return null;
  }

  setToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('authToken', token);
    }
  }

  clearToken() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
    }
  }
}
