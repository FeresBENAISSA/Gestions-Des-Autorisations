import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersComponent } from 'src/app/pages/users/users.component';
import { AuthorizationComponent } from 'src/app/pages/authorization/authorization.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UserAutorisationComponent } from 'src/app/pages/user-autorisation/user-autorisation.component';
import { NotifierModule } from 'angular-notifier';
// import { ToastrModule } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    Ng2SmartTableModule,
    NgxPaginationModule
  ],
  declarations: [
    DashboardComponent,
    UsersComponent,
    AuthorizationComponent,
    
  ],
  providers: [DatePipe]
})

export class AdminLayoutModule {}
