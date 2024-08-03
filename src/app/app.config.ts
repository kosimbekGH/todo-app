import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {APP_ROUTES} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {authInterceptor, errorInterceptor} from './core/interceptors';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(APP_ROUTES),
        provideHttpClient(), provideAnimationsAsync(), provideAnimationsAsync(),
        provideHttpClient(
            withInterceptors([authInterceptor, errorInterceptor])
        )
    ]
};
