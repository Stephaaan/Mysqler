import {AbstractControl, ValidatorFn} from "@angular/forms";

export function noWhitespaceValidator(control: AbstractControl): { [key: string]: any } | null {
  if (control.value === null) {
    return {empty: true};
  }
  if (control.value.trim() === "") {
    return {empty: true};
  }
  return null;
}
