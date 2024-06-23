import { CanActivateFn } from '@angular/router';

export const instructorGuard: CanActivateFn = (route, state) => {
  return true;
};
