import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { TokenService } from 'src/app/services/token.service';
import { UserCredentials } from 'src/app/typings/user-credentials.type';
import { User } from 'src/app/typings/user.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class LoginService {
  constructor(
    private http: HttpClient,
    private router: Router,
    public global: GlobalService,
    private token: TokenService
  ) {}

  public error: string | null = null;

  public login(credentials: UserCredentials) {
    firstValueFrom(
      this.http.post<User>(`${environment.apiURL}/user/login`, credentials)
    )
      .then((user) => {
        this.global.user = user;
        this.token.getToken(user.id);
      })
      .catch((err) => {
        if (err.error.status === 404)
          this.error = 'User not found with that email';
        else if (err.error.status === 401) this.error = 'Incorrect password';
      });
  }

  public register(credentials: UserCredentials, passwordConfirm: string) {
    if (credentials.password === passwordConfirm)
      firstValueFrom(
        this.http.post<User>(`${environment.apiURL}/user/register`, credentials)
      )
        .then((user) => {
          this.global.user = user;
          this.token.getToken(user.id);
          this.router.navigate(['profile/']);
        })
        .catch((err) => {
          if (err.error.status === 409)
            this.error = 'User already exists with that email';
        });
  }
}
