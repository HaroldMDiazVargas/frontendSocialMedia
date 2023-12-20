import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, switchMap } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();

    if (token)
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

    if (!req.headers.has('Content-Type'))
      req = req.clone({
        headers: req.headers.set('Content-Type', 'application/json'),
      });

    return next.handle(req);
  }
}
