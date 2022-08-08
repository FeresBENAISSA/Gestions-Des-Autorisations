import { Routes } from '@angular/router';
import { loginGuard } from 'src/app/_helpers/login.guard';

import { LoginComponent } from '../../pages/login/login.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent , canActivate:[loginGuard]},
];
