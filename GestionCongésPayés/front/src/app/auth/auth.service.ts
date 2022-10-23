import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    if (token != null) {
      return !this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }

  }
}
