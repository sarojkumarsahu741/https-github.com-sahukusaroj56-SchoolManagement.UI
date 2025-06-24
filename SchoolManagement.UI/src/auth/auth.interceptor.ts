import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service'; // adjust path

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // List of public endpoints (pattern based)
    const publicUrls = [
      '/auth/AuthenticateUser'
    ];

    // Check if request URL matches any public URL
    const isPublic = publicUrls.some(url => req.url.includes(url));

    if (isPublic) {
      // Don't attach token
      return next.handle(req);
    }

    // Attach token for private APIs
    const token = this.tokenService.getToken();

    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(authReq);
  }
}
