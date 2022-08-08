import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { ButtonsComponent } from 'src/app/components/buttons/buttons.component';
import { Autorisation } from 'src/app/model/Autorisation';
import { User } from 'src/app/model/User';
import { AutorisationService } from 'src/app/services/autorisation.service';
import { ExcelService } from 'src/app/services/ExcelService';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
  constructor(config: NgbModalConfig, private modalService: NgbModal,
  private autorizationService: AutorisationService,
  // private excelService:ExcelService,
  private userService : UserService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  settings = {
    columns: {
      idAuto: {
        title: 'ID'
      },
      user : {
        title : 'name',
        valuePrepareFunction: (user)=> {return user.name},
        filterFunction(user?: any, search?: string): boolean {
          if (user.name.toUpperCase().indexOf(search.toUpperCase()) >= 0) {
            return true;
          } else  {
            return false;
          }
        // (row,col)=>{
        //   console.log(col.name);
        //   return col.name;        }
      }
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
        title: 'State',
        
      },
      test:{
        title:'action',
        type: 'custom',
        filter: false,
        renderComponent: ButtonsComponent,
        onComponentInitFunction: (instance)=>{
          // instance
          instance.event.subscribe(res=>{
            if(res==true){
              this.getAutorisation();
            }
          })
        }
      },
    
    },
    actions:{
      add :false,
      edit :false,
      delete :false,
    
    },
    attr: {
      class: 'custom '
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

  /* Modal configuration using ngbModal  */
  closeResult = ''

  open(content) {
  //  let refmodal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  let refmodal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
    refmodal.closed.subscribe(res=>console.log(res))
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

  // exportAsXLSX(): void {
  //   this.excelService.exportAsExcelFile(this.autorisation, 'sample');
  // }



  /*--------------------------------- */
  ngOnInit(

  ): void {

    this.getAutorisation();
  }


}
