import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function booleanValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return control.value === true ? null : {invalidBoolean: true};
    };
}
