import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/model/Role';
import { User } from 'src/app/model/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { threadId } from 'worker_threads';
import swal from 'sweetalert2';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService: UserService, private auth: AuthenticationService, private router: Router) { }
  currentUser: User;
  editUser: User;

  logOut() {
    this.auth.logout().subscribe(
      {
        next: (resp) => (console.log(resp))
      }
    )
    localStorage.removeItem('currentUser');
    localStorage.clear();
    sessionStorage.removeItem('JSESSIONID');
    this.router.navigate(['/login']);
  }
  emailExist: boolean = false;
  async getUserByEmail(email: string) {
    let user: User = <User>await this.userService.getUserByEmail(email)
      .then(
        (response) => {
          //this.usernameExist=true;
          return response;
        }
      )
      .catch(
        (err) => { console.log(err) }
      )
  }




  async confirmSwal(user: User) {

    this.editUser = user;
    this.editUser.id = this.currentUser.id;
    this.editUser.username = this.currentUser.username;
    this.editUser.roles = this.currentUser.roles;


    let user2: User = <User>await this.userService.getUserByEmail(this.editUser.email)
      .then(response => {
        console.log(response)
        return response;
      })
      if (user2 != null) {
        if (user2.id == this.currentUser.id) {
          this.emailExist = false;
        } else {
          this.emailExist = true;
        }
      }else {
        this.emailExist = false;
        
      }


    if (!this.emailExist) {
      swal.fire({
        title: 'Are you sure?',
        text: " ",
        html:
          "<h4>You won't be able to revert this! </h4>" +
          "<h2>New Login Info : </h2>" +
          " <b>Username</b>:" + this.editUser.username + "<br>" +
          " <b>Password</b> :" + this.editUser.password
        ,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update User Information!',
        confirmButtonColor: '#2dce89',
        cancelButtonColor: '#f5365c',
      }).then((result) => {
        if (result.value) {
          this.userService.updatetUser(this.editUser).subscribe(
            {
              next: (res) => {
                console.log(res)
                this.logOut();
              },
              error: (err) => { console.log(err) }
            }
          )
          // Show confirmation
          swal.fire({
            title: 'Updated!',
            text: 'User Information Update ',
            icon: 'success',
            confirmButtonColor: '#2dce89',
          });
        }
      })
    }
  }
  ngOnInit() {
    this.currentUser = this.auth.currentUserValue;
    this.editUser = this.currentUser;
    console.log(this.editUser);
  }

}
