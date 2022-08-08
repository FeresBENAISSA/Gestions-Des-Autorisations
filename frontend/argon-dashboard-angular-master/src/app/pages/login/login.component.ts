import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  username: string ;
  password: string ;
  userExist : Boolean = true;
  message: any;
  constructor(
    private userService: UserService,
    private router: Router,
    private authenticationService: AuthenticationService) { }
    public getCurrentUserValue() {
    this.authenticationService.getCurrentUserValue()
    
  }

  login(form :NgForm){

    if(form.valid){
      this.username=form.value.username;
      this.password=form.value.password;
      this.signIn()
    }
  }


  signIn() {
    if(localStorage.getItem("currentUser") == null ){
      var formData = new FormData();
      formData.set('username', this.username);
      formData.set('password', this.password);
      //.log(this.username);
      this.authenticationService.login(formData).subscribe({
        next: (res) => {
          this.authenticationService.getCurrentUserValue() 
          this.authenticationService.currentUser.subscribe(res => {
            if (res != null && localStorage.getItem("currentUser") == null ) {
              localStorage.setItem("currentUser", JSON.stringify(res));
              if(res.roles[0].name == 'ROLE_EMP'){
                this.router.navigateByUrl('/user-dashboard');
              }
              else(res.roles[0].name == 'ROLE_ADMIN')
              {
                this.router.navigate(['/dashboard']);
              }
            }
          })
        },
        error: (err) => {
          console.log(err)
          this.userExist=false ;
        }
      })
    }else {
      let currentUser=JSON.parse(localStorage.getItem("currentUser"));
      if(currentUser.roles[0].name ==='ROLE_EMP'){
        this.router.navigate(['/user-dashboard']);
      }
      else(currentUser.roles[0].name =="ROLE_ADMIN")
      {
        this.router.navigate(['/dashboard']);
      }
    }
  }

  logOut() {
    this.authenticationService.logout().subscribe(
      {
        next: (resp) => (
          console.log(resp)
          )
      }
    )
    localStorage.removeItem('currentUser');
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

}
