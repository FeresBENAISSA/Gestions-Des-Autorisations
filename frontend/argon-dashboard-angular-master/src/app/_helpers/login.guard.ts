import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


 
@Injectable({ providedIn: 'root' })
export class loginGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // const currentUser = this.authenticationService.currentUserValue;
        const currentUser =localStorage.getItem("currentUser");
        const currentUserObject = JSON.parse(currentUser);

        if (currentUser) {
            // this.router.navigateByUrl('/dashboard');
            if (currentUserObject.roles[0].name == 'ROLE_ADMIN') {
                this.router.navigateByUrl('/dashboard');
            }
            if (currentUserObject.roles[0].name == 'ROLE_EMP') {
                this.router.navigateByUrl('/user-dashboard');
            }
            // this.router.navigateByUrl('/dashboard');
            return true;
        }

        // not logged in so redirect to login page with the return url
        // this.router.navigateByUrl('/login');
        return true;
    }
}