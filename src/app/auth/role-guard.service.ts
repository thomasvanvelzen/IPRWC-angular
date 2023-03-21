import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(
    public router: Router,
    private token: TokenService
  ) {}
  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const expectedRole = route.data['expectedRole'];

    const token = this.token.getTokenFromLocalStorage();

    if (!token) this.router.navigate(['login']);

    return this.token.validateToken(expectedRole);
  }
}
