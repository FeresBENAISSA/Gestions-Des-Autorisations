import { Routes } from '@angular/router';


import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';

import { UserAutorisationComponent } from 'src/app/pages/user-autorisation/user-autorisation.component';
import { AuthGuard } from 'src/app/_helpers/auth.guard';
import { PageNotFoundComponent } from 'src/app/pages/page-not-found/page-not-found.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { UserDashboardComponent } from 'src/app/pages/user-dashboard/user-dashboard.component';

export const UserLayoutRoutes: Routes = [
    {path :'user-dashboard' , component:  UserDashboardComponent,
    canActivate: [AuthGuard]
},
    { path: 'user-autorisation',   component: UserAutorisationComponent, 
    canActivate: [AuthGuard]
},
    { path: 'user-profile',      component: UserProfileComponent ,
    canActivate: [AuthGuard]
},


    // { path: 'page-not-found',      component: PageNotFoundComponent },

];
