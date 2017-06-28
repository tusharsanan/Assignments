import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { LoginFormComponent } from './login-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
    imports: [ ReactiveFormsModule, CommonModule],
    declarations: [LoginFormComponent, DashboardComponent],
    exports: [LoginFormComponent]
})

export class LoginFormModule {}