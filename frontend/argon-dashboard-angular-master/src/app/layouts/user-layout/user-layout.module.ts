import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { UserLayoutRoutes } from './user-layout.routing';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersComponent } from 'src/app/pages/users/users.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UserAutorisationComponent } from 'src/app/pages/user-autorisation/user-autorisation.component';
import { UserDashboardComponent } from 'src/app/pages/user-dashboard/user-dashboard.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    Ng2SmartTableModule
  ],
  declarations: [
    UserProfileComponent,
    UserAutorisationComponent,
    UserDashboardComponent
  ]
})

export class UserLayoutModule {}
