import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILogin, ISignup, IToken, IUser, IUserDecoded } from '../models';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';
import { TokenService } from './token.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.apiUrl + '/auth';
  private user$ = new BehaviorSubject<IUser>({} as IUser);

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  register(newUser: ISignup) {
    return this.http
      .post<IUser>(this.baseUrl + '/register', newUser)
      .pipe(take(1));
  }

  login(credentials: ILogin): Observable<IToken> {
    return this.http.post<IToken>(this.baseUrl + '/login', credentials).pipe(
      take(1),
      tap((response: IToken) => {
        this.tokenService.storeToken(response.access_token);
        const decodedToken: IUserDecoded = jwtDecode(response.access_token);
        this.user$.next(decodedToken.user);
      })
    );
  }
}
