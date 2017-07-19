import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AddressFields } from '../shared/addressFields';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './address.component.html',
  styleUrls: [ '../scss/module-styles.css' ],
})
export class AddressComponent implements OnInit {
  address = new AddressFields('',null,'','',null);
  addressForm: FormGroup;
  registerFail = false;
  constructor(private user: UserService, private fb: FormBuilder, private router: Router){}
  ngOnInit() {
    this.buildForm();
  }
  // Clear the form on click of reset
    resetAddressForm() {
        this.addressForm.reset();
    }

    confirmAddress() {
        this.router.navigate(['/success']);
    }

    buildForm():void {
    this.addressForm = this.fb.group({
            'buildingName': [this.address.buildingName, [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(100),
                ]
            ],
             'roomNumber': [this.address.roomNumber,[
                Validators.required,
                Validators.maxLength(20),
            ]
          ],
            'city': [this.address.city, [
                Validators.required,
                Validators.maxLength(50)
              ]
            ],
             'state': [this.address.state,[
               Validators.required,
               Validators.maxLength(50)
            ]
        ],
        'pin': [this.address.pin,[
                Validators.required,
                Validators.minLength(6),
            ]
        ] 
    });
    this.addressForm.valueChanges.subscribe(data => this.onAddressFieldChanged(data));
  }
  onAddressFieldChanged(data?: any) {
    this.registerFail = false;
    const form = this.addressForm;
    for(const field in this.addressFormErrors) {
      this.addressFormErrors[field] ='';
      const control = form.get(field);
      if(control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.addressFormErrors[field] = messages[key] + '';
                }
            }
         }
      }
  addressFormErrors = {
        'buildingName': '',
        'roomNumber': '',
        'city': '',
        'state': '',
        'pin': ''
    };
  validationMessages = {
        'buildingName': {
            'required':      'Building name is required.',
            'minlength':     'Building name must be at least 3 characters long.'
        },
        'roomNumber': {
            'required':      'Room Number is required.',
            'maxlength':     'Room Number must be maximum 15 numbers long.',
        },
        'city': {
            'required':      'City is required.',
            'maxlength':     'City name must not be greater than 50 characters.'
        },
        'state': {
            'required':      'State is required.',
            'maxlength':     'State name must not be greater than 50 characters.'
        },
        'pin': {
            'required':      'PIN is required.',
            'minlength':     'PIN must be at least 6 characters long.',
        }
    };
}
