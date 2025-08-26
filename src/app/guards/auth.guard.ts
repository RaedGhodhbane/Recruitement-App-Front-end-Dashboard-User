import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['roles'] as string[] | undefined;
    const userRole = this.authService.getRole();

if (this.authService.isAuthenticated() && (!expectedRoles || expectedRoles.includes(userRole!))) {
  return true;
} else {
  this.router.navigate(['/unauthorized']);
  return false;
}
  }
}
