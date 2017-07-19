import { Component, OnInit, Directive, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ValidatorFn, AbstractControl } from '@angular/forms'

import { loginUser } from './loginUser';

export function specialCharValidator(specialCharRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const numericEntries = control.value;
        const no = specialCharRe.test(numericEntries);
        return no ? null : {'forbiddenChar': {numericEntries}}
    }
}