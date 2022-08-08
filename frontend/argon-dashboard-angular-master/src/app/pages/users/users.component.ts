import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { ButtonsComponent } from 'src/app/components/buttons/buttons.component';
import { Role } from 'src/app/model/Role';
import { User } from 'src/app/model/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {

  settings = {
    columns: {
      id: {
        title: 'ID'
      },
      name: {
        title: 'Full Name'
      },
      username: {
        title: 'Username'
      },
      email: {
        title: 'Email'
      },
      roles: {
        title: 'Role',
        valuePrepareFunction: (role) => {
          return role[0].name;
        },
        filterFunction(role?: any, search?: string): boolean {
          if (role[0].name.toUpperCase().indexOf(search.toUpperCase()) >= 0) {
            return true;
          } else {
            return false;
          }
        }
      },
      test: {
        title: 'action',
        type: 'custom',
        filter: false,
        renderComponent: ButtonsComponent,
        onComponentInitFunction: (instance) => {
          // instance
          instance.event.subscribe(res => {
            if (res == true) {
              // this.getAutorisation();
            }
          })
        }
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
  
  };
  /*Constructor */
  constructor(config: NgbModalConfig,
    private modalService: NgbModal,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private notifier: NotifierService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  /*Methodes related to server */
  //getting all users
  users: User[]
  public getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (response: User[]) => {
        this.users = response;
      },
      error: (error: HttpErrorResponse) => { console.log(error) }
    })
  }
  // getting all roles
  allRoles: Role[];
  public getRoles(): void {
    this.userService.getRoles().subscribe({
      next: (response: Role[]) => {
        this.allRoles = response;
      },
      error: (error: HttpErrorResponse) => { console.log(error) }
    })
  }
  /* get user by username*/
  usernameExist: boolean = false;
  async getUserByUsername(username: String) {
    let user: User = <User>await this.userService.getUserByUsername(username)
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
  emailExist: boolean=false;
  async getUserByEmail(email:string)
  {  let user: User = <User>await this.userService.getUserByEmail(email)
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







  newUser: User;
  async addUser(addUser: NgForm) {
    this.newUser = addUser.value;
    if (addUser.valid) {
      let user: User = <User>await this.userService.getUserByUsername(this.newUser.username)
        .then(response => {
          if (response != null) {
            this.usernameExist = true;
          } else {
            this.usernameExist = false;
          }
          return response;
        })

        let user2: User = <User>await this.userService.getUserByEmail(this.newUser.email)
        .then(response => {
          if (response != null) {
            this.emailExist = true;
          } else {
            this.emailExist = false;
          }
          return response;
        })

      let newRoles: Role[] = [];
      newRoles.push(this.allRoles[1]);
      this.newUser.roles = newRoles;
      if (!this.usernameExist && !this.emailExist)
      {
        swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, Add New User!',
          confirmButtonColor: '#2dce89',
          cancelButtonColor: '#f5365c',
        }).then((result) => {
          if (result.value) {
            if (!this.usernameExist && !this.emailExist) {
              this.userService.addUser(this.newUser).subscribe(
                {
                  next: (response) => {
                    this.getUsers()
                    this.modalService.dismissAll();
                    this.notifier.notify('success', 'You are awesome! I mean it!');
                  },
                  error: (err) => { console.log(err) }
                }
              )
            }
            // Show confirmation
            swal.fire({
              title: 'Success!',
              text: 'User added successfully',
              icon: 'success',
              confirmButtonColor: '#2dce89',
              // buttonsStyling: false,
              // confirmButtonClass: 'btn btn-primary'
            });
          }
        })
      }

    }
  }


  /* random password method */
  chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  passwordLength = 12;
  password = "";
  public generateRandomPassword() {
    if (this.password != "") {
      this.password = "";
    }
    for (var i = 0; i <= this.passwordLength; i++) {
      var randomNumber = Math.floor(Math.random() * this.chars.length);
      this.password += this.chars.substring(randomNumber, randomNumber + 1);
    }
  }
  
  show: boolean = false;
  public viewPassword() {
    this.show = !this.show;
  }
  /* form handle */
  userForm: FormGroup
  /*Modal  */
  closeResult = ''
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  ngOnInit(): void {
    this.getUsers();
    this.getRoles();
  }

}
