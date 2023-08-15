import { AbstractControl, ValidationErrors } from '@angular/forms';

export class ConfirmPasswordValidator {
  static MatchPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('usrPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ ConfirmPassword: true });
      return { not_the_same: true };
    } else {
      return null;
    }
  }
}
