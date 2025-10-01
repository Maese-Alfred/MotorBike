import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role']; // rol requerido de la ruta
    const userRole = this.authService.getUserRole(); // obtiene rol del usuario logueado

    if (this.authService.isAuthenticated() && userRole === expectedRole) {
      return true;
    }

    // opcional: podrías redirigir a una página de "403 no autorizado"
    this.router.navigate(['/forbidden']);
    return false;
  }
}
