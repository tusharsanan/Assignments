import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginUser } from './shared/loginUser';
import { emailValidator } from './shared/emailValidator.directive';
import { UserService } from './user.service';
@Component ({
    selector: 'login-form',
    templateUrl: './login-form.component.html',
    styleUrls: [ './scss/module-styles.css' ],
})
export class LoginFormComponent implements OnInit {
    user = new loginUser('', '');
    submitted = false;
    loginFail = false;
    employees = [];
    resetForm() {
        this.loginForm.reset();
    }

    loginUser(e){
        e.preventDefault();
        var email = e.target.elements[0].value;
        var password = e.target.elements[1].value;
     /* if(email == 'tushar.sanan@gmail.com' && password == 'qwertyui') {
            this._employeeService.setUserLoggedIn();
            this.router.navigate(['/dashboard']);
        }
        else {
            this.loginFail = true;
        } */
        
        for (var key in this.employees) {
            if (this.employees.hasOwnProperty(key)) {
                var val = this.employees[key];
                if(val.username == email && val.password == password) {
                    this._employeeService.setUserLoggedIn();
                    this.router.navigate(['/dashboard']);
                }
                else {
                    this.loginFail = true;
                }
            }
        }
}
    active = true;
    
    loginForm: FormGroup;
    constructor(private fb: FormBuilder, private router: Router, private _employeeService:UserService) {}

    ngOnInit() {
        this.buildForm();
        this._employeeService.getUsers().subscribe(resEmployeeData => this.employees = resEmployeeData);
    }   
    

    buildForm():void {
       
        this.loginForm = this.fb.group({
            'email': [this.user.email, [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(100),
                    emailValidator(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)
                ]
            ],
            'password': [this.user.password, [
                Validators.required,
                Validators.minLength(8)
            ]]
        });
        this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }
    onValueChanged(data?: any){
         
        this.loginFail = false;
        if(!this.loginForm) { return; }
        const form = this.loginForm;
        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = form.get(field);
            if(control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] = messages[key] + '';
                }
            }
        }
    }
    formErrors = {
        'email': '',
        'password': ''
    };
    
    validationMessages = {
        'email': {
            'required':      'Email is required.',
            'minlength':     'Email must be at least 4 characters long.',
            'maxlength':     'Email cannot be more than 100 characters long.',
            'forbiddenName': 'Plese enter the email in the correct format. e.g. myname@mailprovider.com'
        },
        'password': {
            'required':      'Password is required.',
            'minlength':     'Password must be at least 8 characters long.'
        }
    };
}