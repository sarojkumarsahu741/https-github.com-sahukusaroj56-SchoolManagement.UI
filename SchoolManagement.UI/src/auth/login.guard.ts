import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from './token.service';
import { isPlatformBrowser } from '@angular/common';

export const loginGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (isPlatformBrowser(platformId)) {
    const token = tokenService.getToken();
    if (token) {
      if (state.url !== '/dashboard') {
        router.navigate(['/dashboard'], { replaceUrl: true });
      }
      return false;
    } else {
      return true;
    }
  }
  
  return true;
};
