import {Routes} from '@angular/router';
import {authGuard} from './core/guards';

export const APP_ROUTES: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./components/authentication/login/login.routes').then(m => m.LOGIN_ROUTES)
    },
    {
        path: 'todos',
        loadComponent: () => import('./components/todos/todos.component').then(m => m.TodosComponent),
        // canActivate: [authGuard]
    },
    {
        path: '',
        redirectTo: '/todos',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/todos'
    }
];