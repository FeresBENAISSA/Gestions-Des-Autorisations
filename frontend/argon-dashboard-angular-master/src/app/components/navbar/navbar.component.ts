import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  constructor(location: Location, private authenticationService: AuthenticationService, private element: ElementRef, private router: Router) {
    this.location = location;
  }
  userRoleEmp : boolean;
  currentUser: User;
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



  source :string;

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.currentUser = this.authenticationService.currentUserValue;
    if(this.currentUser.roles[0].name =="ROLE_EMP"){
      this.userRoleEmp = true;
      this.source="../../../assets/img/theme/shrug.png";
    } else {
      this.userRoleEmp = false;
      this.source="../../../assets/img/theme/software-engineer.png";

    }
  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

}
