import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import { UserProfile } from 'src/app/typings/user-profile.type';
import { TokenService } from 'src/app/services/token.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  public error: string | null = null;
  public success: boolean = false;

  constructor(private service: ProfileService, private token: TokenService) {
    this.getProfile();
  }

  public profile: UserProfile = {
    id: '',
    firstName: '',
    lastName: '',
    city: '',
    postalCode: '',
    houseNumber: '',
  };

  public profileForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z ]*'),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z ]*'),
    ]),
    houseNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    postalCode: new FormControl('', [
      Validators.required,
      Validators.pattern('^[1-9][0-9]{3}s?([a-zA-Z]{2})?$'),
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
    ]),
  });

  get firstName() {
    return this.profileForm.get('firstName');
  }

  get lastName() {
    return this.profileForm.get('lastName');
  }

  get houseNumber() {
    return this.profileForm.get('houseNumber');
  }

  get postalCode() {
    return this.profileForm.get('postalCode');
  }

  get city() {
    return this.profileForm.get('city');
  }

  public updateProfile() {
    const authority = this.token.getTokenFromLocalStorage();
    this.profile.id = authority.user.id;
    firstValueFrom(this.service.updateProfile(this.profile))
      .then((profile) => {
        if (!profile) return;
        this.profile = profile;
        this.handleSuccess(3);
      })
      .catch((err) => {
        this.error = err.error.message;
      });
  }

  public getProfile() {
    this.service.getProfile().subscribe((profile) => {
      if (!profile) return this.logout();
      this.profile = profile;
    });
  }

  public logout() {
    this.token.destroyTokenFromLocalStorage();
    window.location.reload();
  }

  handleSuccess(seconds: number) {
    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, seconds * 1000);
  }
}
