import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function dobValidator(maxDate: Date): ValidatorFn {


  return (control: AbstractControl): ValidationErrors | null => {
    const dob  = new Date(control.value)
    const invalidDate = dob > maxDate;
    return invalidDate ? {invalidDate: {value: control.value}} : null;
  };
}
