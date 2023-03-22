import { Component } from '@angular/core';
import { UserCredentials } from 'src/app/typings/user-credentials.type';
import { GlobalService } from '../../services/global.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(
    public global: GlobalService,
    public loginService: LoginService
  ) {}

  public isLoggingIn = true;

  public userCredentials: UserCredentials = { email: null, password: null };
  public passwordConfirm: string | null = null;

  public handleFormSubmit() {
    if (this.isLoggingIn) {
      this.loginService.login(this.userCredentials);
    } else {
      this.loginService.register(
        this.userCredentials,
        this.passwordConfirm as string
      );
    }
  }

  public toggleLogin() {
    this.isLoggingIn = !this.isLoggingIn;
  }

  public onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.handleFormSubmit();
    }
  }

  public get error() {
    return this.loginService.error;
  }
}
