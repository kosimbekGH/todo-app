import {inject} from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn} from '@angular/router';
import {AuthService} from '../services';

export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): boolean => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const currentUser = authService.currentUserValue;
    if (currentUser) {
        return true;
    }

    router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
};