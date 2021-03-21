import {AbstractControl} from "@angular/forms";

export function ipAddressValidator(control: AbstractControl): { [key: string]: any } | null {
  if (control.value === null) {
    return null;
  }
  console.log('validationg', control.value.split('.'))
  const sections = control.value.split('.')
  sections.forEach(section => {
    try {
      const s = parseInt(section);
      console.log(s)
      if(s < 0 || s > 255) {
        console.log('invalid')
        return {invalid: true}
      }
    }catch (e) {
      return {invalid: true}
    }
  })
  return null;
}
