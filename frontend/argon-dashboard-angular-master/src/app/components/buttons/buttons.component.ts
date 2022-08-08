import { error } from '@angular/compiler/src/util';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/model/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AutorisationService } from 'src/app/services/autorisation.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {
  @Input() rowData: any;
  @Output() event = new EventEmitter();
  state;
  constructor(private modalService: NgbModal, private autorisationService: AutorisationService, private auth: AuthenticationService) { }

  currentUser: User;
  userExistEmp: boolean;
  public Refused() {
    let updatedRowDate = this.rowData;
    updatedRowDate.state = "Refused";
    this.autorisationService.updatetAutorisation(updatedRowDate).subscribe(
      {
        next: (response) => {
          this.event.emit(true);
        },
        error: (err) => {
          console.error(err);
        }
      }
    )
    this.modalService.dismissAll();
  }
  public Approved() {
    let updatedRowDate = this.rowData;
    updatedRowDate.state = "Approved";
    this.autorisationService.updatetAutorisation(updatedRowDate).subscribe(
      {
        next: (response) => {
          this.event.emit(true);
        },
        error: (err) => { console.error(err); }
      }
    )
    this.modalService.dismissAll();
  }



  ngOnInit(): void {
    this.currentUser = this.auth.currentUserValue;
    if (this.currentUser.roles[0].name == 'ROLE_EMP') {
      this.userExistEmp = true;
    } else {
      this.userExistEmp = false;
    }
  }
  onOpen(action, content) {
    let refmodal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }
  onClick(action) {
    this.event.emit(true);
  }
}
