import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const authGuard: CanActivateFn = (route) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if user is logged in
  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  // Get required role from route data
  const expectedRole = route.data?.['role'];

  // Get logged-in user's role
  const userRole = authService.getRole();

  // Check role
  if (expectedRole && userRole !== expectedRole) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};