import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { loginUser } from '../shared/loginUser';
import { emailValidator } from '../shared/emailValidator.directive';
import { specialCharValidator } from '../shared/specialCharValidator.directive';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';

@Component ({
    selector: 'login-form',
    templateUrl: './login-form.component.html',
    styleUrls: [ '../scss/module-styles.css' ],
})

export class LoginFormComponent implements OnInit {
    user = new loginUser('', '');
    submitted = false;
    returnUrl: string;
    loginFail = false;
    employees = [];
    myNewUsers: loginUser[] = [];

constructor(private fb: FormBuilder,private route: ActivatedRoute, private router: Router, private alertService: AlertService, private _employeeService:UserService, private authenticationService: AuthenticationService) {}

    // Clear the form on click of cancel
    resetForm() {
        this.loginForm.reset();
    }

    loginUser(e) {
        var email = e.target.elements[0].value;
        var password = e.target.elements[1].value;

     // Calling the authentication service to validate a user

        this.authenticationService.login(email, password)
            .subscribe(
                data => {
                    this._employeeService.setUserLoggedIn();
                    this.router.navigate(['/address']);
                },
                error => {
                    this.alertService.error(error);
            });
        }
        active = true;
        loginForm: FormGroup;
                

        ngOnInit() {
            this.buildForm();
        }

        buildForm():void {
        this.loginForm = this.fb.group({
            'email': [this.user.email, [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(100),
                    //Custom email validator
                    emailValidator(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)
                ]
            ],
            'password': [this.user.password, [
                Validators.required,
                Validators.minLength(8)
              ]
            ]
      
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
        'password': '',
    };
    
    // Validation messages

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