import { inject } from '@angular/core';
import { TokenService } from './token.service';

export function initializeToken(): Promise<void> {
  const tokenService = inject(TokenService);
  
  return Promise.resolve(tokenService.getToken()).then(() => {
    // Optionally do something after token is loaded
  });
}
