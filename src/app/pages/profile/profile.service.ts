import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from 'src/app/typings/user-profile.type';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/services/token.service';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class ProfileService {
  constructor(private http: HttpClient, private token: TokenService) {}

  public updateProfile(profile: UserProfile): Observable<UserProfile> {
    return this.http.post<UserProfile>(
      `${environment.apiURL}/profile`,
      profile,
      this.token.createAuthorizationHeader()
    );
  }

  public getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(
      `${environment.apiURL}/profile`,
      this.token.createAuthorizationHeader()
    );
  }
}
