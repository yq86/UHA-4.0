import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';



@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  tokenPayload: any;
  role2: any;

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const role = route.data['role'];
    if(route.data['role2']){
      this.role2 = route.data['role2'];
    }
    
    const token = localStorage.getItem('accessToken');
    if (token != null) {
        // decode the token to get its payload
      this.tokenPayload = decode(token);
      if(this.role2){
        if ( (this.tokenPayload.role != role) && (this.tokenPayload.role != this.role2)) {
          this.router.navigate(['login']);
          return false;
        } else {
          return true;
        }
      } else {
        if ( this.tokenPayload.role != role) {
          this.router.navigate(['login']);
          return false;
        } else {
          return true;
        }
      }
    } else {
      return false;
    }

  }
}
