import {inject} from '@angular/core';
import {
    HttpRequest,
    HttpEvent,
    HttpInterceptorFn,
    HttpHandlerFn,
    HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../services';

export const errorInterceptor: HttpInterceptorFn = (
    request: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    return next(request).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                const authService = inject(AuthService);
                authService.logout();
                location.reload();
            }

            const errorMessage = error.error?.message || error.statusText;
            console.error(errorMessage);
            return throwError(() => new Error(errorMessage));
        })
    );
};
