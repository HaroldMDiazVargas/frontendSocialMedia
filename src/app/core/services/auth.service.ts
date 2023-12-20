import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ISignup, IUser } from '../models';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) {}

  register(newUser: ISignup) {
    return this.http
      .post<IUser>(this.baseUrl + '/register', newUser)
      .pipe(take(1));
  }
}
