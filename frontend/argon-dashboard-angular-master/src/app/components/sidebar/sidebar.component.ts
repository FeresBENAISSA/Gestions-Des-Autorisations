import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageNotFoundComponent } from 'src/app/pages/page-not-found/page-not-found.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  scope: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '', scope: 'ROLE_ADMIN' },
  { path: '/user-dashboard', title: 'User-Dashboard', icon: 'ni-tv-2 text-primary', class: '', scope: 'ROLE_EMP' },
  { path: '/authorization', title: 'Authorization', icon: 'ni-bullet-list-67 text-success', class: '', scope: 'ROLE_ADMIN' },
  { path: '/users', title: 'Users', icon: 'ni-bullet-list-67 text-red', class: '', scope: 'ROLE_ADMIN' },
  { path: '/user-autorisation', title: 'User Authorization', icon: 'ni-single-02 text-yellow', class: '', scope: 'ROLE_EMP' },
  { path: '/user-profile', title: 'User profile', icon: 'ni-single-02 text-yellow', class: '', scope: 'ROLE_EMP' }

  // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '',scope : 'admin' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  public currentUser;
  source : String;
  constructor(private router: Router, private authenticationService: AuthenticationService) { }
  logOut() {
    this.authenticationService.logout().subscribe(
      {
        next: (resp) => (console.log(resp))
      }
    )
    localStorage.removeItem('currentUser');
    localStorage.clear();
    // sessionStorage.removeItem('JSESSIONID');
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(res => {
      res != null ? this.currentUser = res : res = null;
      if(res!=null){
        if(res.role=="ROLE_ADMIN"){
          this.source="../../../assets/img/theme/software-engineer.png";
        }else {
          this.source="../../../assets/img/theme/shrug.png";
        }
      }
    })

    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
