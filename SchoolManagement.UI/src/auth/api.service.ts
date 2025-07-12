import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../environment';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private confirmationService: ConfirmationService
  ) { }

  request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    body?: any,
    params?: { [param: string]: string | number },
    customHeaders?: { [header: string]: string },
    responseType: 'json' | 'text' = 'json'
  ): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.set(key, params[key].toString());
      });
    }

    let headers = new HttpHeaders();
    if (customHeaders) {
      Object.keys(customHeaders).forEach(key => {
        headers = headers.set(key, customHeaders[key]);
      });
    } else {
      if (typeof body === 'string') {
        headers = headers.set('Content-Type', 'text/plain');
      } else if (body) {
        headers = headers.set('Content-Type', 'application/json');
      }
    }

    const fullUrl = `${environment.apiBaseUrl}${url}`;

    return (this.http.request(method, fullUrl, {
      body: body || null,
      params: httpParams,
      headers: headers,
      responseType: responseType
    }) as Observable<T>).pipe(
      tap(response => {
        if (environment.enableApiLogs) {
        }
      }),
      catchError((error) => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg = '';

    if (error.error instanceof ErrorEvent) {
      errorMsg = `Client Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 401:
          errorMsg = 'Session expired. Redirecting to login...';
          this.autoLogout();
          break;
        case 403:
          errorMsg = 'Forbidden! You don’t have permission.';
          break;
        case 405:
          this.confirmationService.confirm({
            message: 'User already logged in. Logout others?',
            header: 'Session Conflict',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              // Call /force-login here or emit event to component
            },
            reject: () => {
              // Do nothing or return to login
            }
          });
          break;
        case 0:
          errorMsg = 'Something went wrong.';
          break;
        default:
          errorMsg = error.error?.message || `Error ${error.status}: ${error.statusText}`;
      }
    }

    if (environment.enableApiLogs) {
      console.error('API Error:', errorMsg, error);
    }

    this.snackBar.open(errorMsg, 'Close', {
      duration: 4000,
      panelClass: 'snackbar-error'
    });

    return throwError(() => new Error(errorMsg));
  }

  private autoLogout() {
    localStorage.removeItem('authToken');
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
