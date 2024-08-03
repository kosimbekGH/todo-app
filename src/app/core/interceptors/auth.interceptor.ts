import {
    HttpRequest,
    HttpEvent,
    HttpInterceptorFn,
    HttpHandlerFn
} from '@angular/common/http';
import {Observable} from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
    request: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    const isLoginRequest = request.url.includes('auth/token/login');

    if (currentUser && currentUser.token && !isLoginRequest) {
        request = request.clone({
            setHeaders: {
                Authorization: `Token ${currentUser.token}`
            }
        });
    }

    return next(request);
};
