import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { LoginFormComponent } from './login-form.component';
import { AddressComponent } from '../address/address.component';
import { SuccessComponent } from '../generic/success.component';
import { AlertComponent } from '../directives/alert.component';
@NgModule({
    imports: [ ReactiveFormsModule, CommonModule],
    declarations: [LoginFormComponent, AddressComponent, AlertComponent, SuccessComponent],
    exports: [LoginFormComponent]
})

export class LoginFormModule {}