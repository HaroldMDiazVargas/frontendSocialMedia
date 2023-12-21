import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  getToken() {
    return localStorage.getItem('access_token');
  }

  storeToken(accessToken: string) {
    localStorage.setItem('access_token', accessToken);
  }

  removeToken() {
    localStorage.removeItem('access_token');
  }
}
