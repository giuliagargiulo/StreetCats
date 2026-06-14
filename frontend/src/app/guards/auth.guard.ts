import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Adatta il percorso se necessario
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getCurrentUser().pipe(
    map(user => {
      if (user) {
        return true;
      }
      alert("You have to login to add a sighting!");
      router.navigate(['/login']);
      return false;
    }),
    catchError((error) => {
      console.warn('Access denied or expired token:', error);
      alert("You have to login to add a sighting!");
      router.navigate(['/login']);
      return of(false);
    })
  );
};
