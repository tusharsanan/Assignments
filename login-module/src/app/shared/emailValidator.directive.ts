import { Component, OnInit, Directive, Input, OnChanges, SimpleChanges } from "@angular/core";
import { FormGroup, FormBuilder, Validators, Validator, NG_VALIDATORS, AbstractControl, ValidatorFn } from '@angular/forms';

import { loginUser } from './loginUser';


export function emailValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const name = control.value;
    const no = nameRe.test(name);
    return no ? null : {'forbiddenName': {name}} ;
  };
}