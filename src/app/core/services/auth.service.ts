import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILogin, ISignup, IToken, IUser, IUserDecoded } from '../models';
import {
  BehaviorSubject,
  Observable,
  from,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
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

  get isUserLoggedIn(): Observable<boolean> {
    return this.user$.asObservable().pipe(
      switchMap((user: IUser) => {
        const isUserAuthenticated = Object.keys(user).length !== 0;
        return of(isUserAuthenticated);
      })
    );
  }

  checkAuthentication(): Observable<boolean> {
    const token = this.tokenService.getToken();
    if (!token) return of(false);
    const decodedToken: IUserDecoded = jwtDecode(token);
    this.user$.next(decodedToken.user);
    return of(true);
  }

  get userStream(): Observable<IUser> {
    return this.user$.asObservable();
  }

  get userFullName(): Observable<string> {
    return this.userStream.pipe(
      switchMap((user: IUser) => {
        return of(`${user.firstName} ${user.lastName}`);
      })
    );
  }

  get userId(): Observable<number> {
    return this.user$.asObservable().pipe(
      switchMap((user: IUser) => {
        return of(user.id);
      })
    );
  }
}
