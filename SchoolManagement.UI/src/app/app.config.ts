import { ApplicationConfig, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { initializeToken } from '../auth/token.initializer'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import LaraLight from '@primeng/themes/lara';
import Aura from '@primeng/themes/aura';
import { ConfirmationService } from 'primeng/api';
import MyPreset from '../theme/my-preset';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes, withEnabledBlockingInitialNavigation()),
  provideHttpClient(withFetch(), withInterceptorsFromDi()),
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  provideAppInitializer(initializeToken),
  provideClientHydration(withEventReplay()),
  provideAnimationsAsync(),
  providePrimeNG({
    theme: {
      preset: LaraLight
      // options: {
      //   darkModeSelector: false,
      //   cssLayer: true
      // }
    }
  }),
    ConfirmationService
  ]
};
