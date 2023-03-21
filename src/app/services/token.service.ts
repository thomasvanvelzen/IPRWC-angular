import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Authority } from '../typings/authority.type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { TokenPayload } from '../typings/token-payload';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class TokenService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private global: GlobalService
  ) {}

  public getTokenFromLocalStorage(): Authority {
    return JSON.parse(localStorage.getItem('auth') as string) as Authority;
  }

  public saveTokenInLocalStorage(authority: Authority): void {
    const token = JSON.stringify(authority);
    localStorage.setItem('auth', token);
  }

  public destroyTokenFromLocalStorage(): void {
    localStorage.removeItem('auth');
  }

  public createAuthorizationHeader() {
    const autority = this.getTokenFromLocalStorage();
    const headers = new HttpHeaders()
      .set('role_token', autority.token)
      .set('user_id', this.global.user.id);

    return { headers };
  }

  public getToken(userId: string) {
    firstValueFrom(
      this.http.get<Authority>(`${environment.apiURL}/auth/${userId}`)
    )
      .then((authority) => {
        this.saveTokenInLocalStorage(authority);
        this.router.navigate(['profile']);
      })
      .catch((err) => {
        //TODO: Handle error
        this.destroyTokenFromLocalStorage();
        this.router.navigate(['login']);
      });
  }

  public async validateToken(expectedRole: string): Promise<boolean> {
    const authority: Authority = this.getTokenFromLocalStorage();
    if (!authority) return false;

    const payload: TokenPayload = {
      userId: authority.user.id,
      role: expectedRole,
      token: authority.token,
    };

    const isValid = await firstValueFrom(
      this.http.post<Authority>(`${environment.apiURL}/auth/validate`, payload)
    )
      .then((authority) => {
        this.saveTokenInLocalStorage(authority);
        this.global.user = authority.user;
        return true;
      })
      .catch(() => {
        this.destroyTokenFromLocalStorage();
        this.router.navigate(['login']);
        return false;
      });

    return isValid;
  }
}
