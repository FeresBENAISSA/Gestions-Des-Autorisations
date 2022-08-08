import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private router :Router) { 

  } 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser.roles[0].name == 'ROLE_EMP') {
        return true;
      } else {
        // this.router.navigate(['/page-not-found'])
        this.router.navigateByUrl('/dashboard');
        return false;
      }
  }
  
}
