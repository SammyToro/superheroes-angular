import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthenticateService);

  if(!auth.isAuthenticated()){
    router.navigate(['login']);
    return false;
  }
  return true;
};
