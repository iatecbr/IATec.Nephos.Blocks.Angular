import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function urlValidator(): ValidatorFn {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null;
        }
        const isValid = urlPattern.test(control.value);
        return isValid ? null : {invalidUrl: true};
    };
}
