import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';  
import { LoginFormModule } from './login/login-form.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login/login-form.component';
import { AddressComponent } from './address/address.component';
import { SuccessComponent } from './generic/success.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';
import { fakeBackendProvider } from './helpers/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { AlertService } from './services/alert.service';


const appRoutes:Routes = [
  {
    path: 'address',
    component: AddressComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'success',
    component: SuccessComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: LoginFormComponent
  }
]
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
   [RouterModule.forRoot(appRoutes),ReactiveFormsModule, CommonModule],
    LoginFormModule,
    FormsModule,
    HttpModule,
    CommonModule,
  ],
  providers: [UserService, AlertService, AuthGuard, AuthenticationService, fakeBackendProvider, MockBackend, BaseRequestOptions],
  bootstrap: [AppComponent]
})
export class AppModule { }
