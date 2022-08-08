import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

import { AuthorizationComponent } from 'src/app/pages/authorization/authorization.component';
import { UsersComponent } from 'src/app/pages/users/users.component';
import { AuthGuard } from 'src/app/_helpers/auth.guard';
import { PageNotFoundComponent } from 'src/app/pages/page-not-found/page-not-found.component';
import { LoginComponent } from 'src/app/pages/login/login.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent , canActivate: [AuthGuard]},
    { path: 'authorization',      component: AuthorizationComponent , canActivate: [AuthGuard]},
    { path: 'users',   component: UsersComponent , canActivate: [AuthGuard]},
    // { path: 'login,',   component: LoginComponent ,canActivate: [AuthGuard] },
    // { path: 'page-not-found',      component: PageNotFoundComponent },
];
