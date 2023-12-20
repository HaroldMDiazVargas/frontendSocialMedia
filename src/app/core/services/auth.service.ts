import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILogin, ISignup, IUser } from '../models';
import { Observable, take, tap } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.apiUrl + '/auth';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  register(newUser: ISignup) {
    return this.http
      .post<IUser>(this.baseUrl + '/register', newUser)
      .pipe(take(1));
  }

  login(credentials: ILogin): Observable<IUser> {
    return this.http.post<IUser>(this.baseUrl + '/login', credentials).pipe(
      take(1),
      tap((response: any) => {
        this.tokenService.storeToken(response.access_token);
      })
    );
  }
}
