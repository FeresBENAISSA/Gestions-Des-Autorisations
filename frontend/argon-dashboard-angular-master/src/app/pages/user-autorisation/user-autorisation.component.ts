import { HttpErrorResponse, JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule } from 'angular-notifier';
import { ButtonsComponent } from 'src/app/components/buttons/buttons.component';
import { Autorisation } from 'src/app/model/Autorisation';
import { Role } from 'src/app/model/Role';
import { User } from 'src/app/model/User';
import { AutorisationService } from 'src/app/services/autorisation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-autorisation',
  templateUrl: './user-autorisation.component.html',
  styleUrls: ['./user-autorisation.component.scss']
})
export class UserAutorisationComponent implements OnInit {

  constructor(config: NgbModalConfig, private modalService: NgbModal,
    private autorizationService: AutorisationService,
    private userService: UserService,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  settings = {
    columns: {
      idAuto: {
        title: 'ID'
      },
      date: {
        title: 'date'
      },
      exitTime: {
        title: 'exitTime'
      },
      returnTime: {
        title: 'returnTime'
      },
      state: {
        title: 'State'
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
              this.getAutorisation();
            }
          })
        }
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    }
  };
  /*Methodes  */
  public autorisation: Autorisation[];
  public getAutorisation(): void {
    this.autorizationService.getAutorisation().subscribe({
      next: (response: Autorisation[]) => {
        this.autorisation = response;
      },
      error: (error: HttpErrorResponse) => { console.log(error) }
    })
    console.log("called get")
  }
  public getAutorisationByUsername(username: String): void {
    this.autorizationService.getAutorisationByUsername(username).subscribe({
      next: (response: Autorisation[]) => {
        this.autorisation = response;
      },
      error: (error: HttpErrorResponse) => { console.log(error) }
    })
    console.log("called get")
  }
  
  /* */
  username = JSON.parse(localStorage.getItem("currentUser")).username;
  user: User;
  newAutorisation: Autorisation;
  async addAutorisation(addAutoForm: NgForm) {
    this.newAutorisation = addAutoForm.value;
    let user: User = <User>await this.userService.getUserByUsername(this.username)
      .then(response => {
        this.newAutorisation.user = response;
        return response;
      })
      .catch(err => console.log(err, 'user does not exist'))
    
    if (addAutoForm.valid) {
      this.autorizationService.addAutorisation(this.newAutorisation).subscribe(
        {
          next: (response: any) => {
            this.modalService.dismissAll();
            this.getAutorisationByUsername(this.username)
          },
          error: (error: HttpErrorResponse) => { console.log(error) }
        },
      )
    }
  }
  currentDate = new Date();
  /* Modal configuration using ngbModal  */
  closeResult = ''
  open(content) {
    let refmodal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
    refmodal.closed.subscribe(res => console.log(res))
  }
  /*--------------------------------- */
  ngOnInit(
  ): void {
    this.getAutorisationByUsername(this.username);
  }
}
