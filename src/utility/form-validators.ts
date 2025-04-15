import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmpassword = control.get('confirmpassword')?.value;

    if (password && confirmpassword && password !== confirmpassword) {
      return { passwordMismatch: true };
    }

    return null;
  }
