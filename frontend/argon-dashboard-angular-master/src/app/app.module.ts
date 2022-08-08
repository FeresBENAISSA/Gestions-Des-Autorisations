import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { MyhttpInterceptor } from './interceptor/myhttp.interceptor';
import { NotifierModule } from 'angular-notifier';

// import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NotifierModule
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    UserLayoutComponent,
    
    // PageNotFoundComponent,
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: MyhttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
