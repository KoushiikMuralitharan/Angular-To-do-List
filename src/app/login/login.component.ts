import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { passwordMatchValidator } from '../../utility/form-validators';
import { HighlightDirective } from '../highlight.directive';
import { loginForm } from '../../model/loginForm.model';
import { signUpForm } from '../../model/signUpForm.model';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, HighlightDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  currentTab: 'login' | 'sign up' = 'login';
  loginForm!: FormGroup;
  signUpForm!: FormGroup;
  isPasswordMismatch: boolean = true;

  ngOnInit(): void {
    this.initializeLoginForm();
    this.initializeSignUpForm();
  }

  private initializeLoginForm(): void {
    this.loginForm = new FormGroup({
      useremail: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  private initializeSignUpForm(): void {
    this.signUpForm = new FormGroup(
      {
        useremail: new FormControl(null, [
          Validators.required,
          Validators.email,
        ]),
        username: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required]),
        confirmpassword: new FormControl(null, [Validators.required]),
      },
      { validators: passwordMatchValidator }
    );

    this.setupPasswordMatchListeners();
  }

  private setupPasswordMatchListeners(): void {
    const passwordControl = this.signUpForm.get('password');
    const confirmPasswordControl = this.signUpForm.get('confirmpassword');

    if (passwordControl && confirmPasswordControl) {
      passwordControl.valueChanges.subscribe(() =>
        this.updatePasswordMismatch()
      );
      confirmPasswordControl.valueChanges.subscribe(() =>
        this.updatePasswordMismatch()
      );
    }
  }

  private updatePasswordMismatch(): void {
    this.isPasswordMismatch = !this.checkPasswordMatch();
  }

  checkPasswordMatch(): boolean {
    const password = this.signUpForm.get('password')?.value;
    const confirmpassword = this.signUpForm.get('confirmpassword')?.value;
    return password === confirmpassword;
  }

  switchTab(tab: 'login' | 'sign up'): void {
    this.currentTab = tab;
  }

  OnLoginFormSubmited() {
    console.log(this.loginForm);
    const loginFormData: loginForm = this.loginForm.value;
    console.log(`Login Form Data: ${JSON.stringify(loginFormData)}`);
  }

  OnSignUpFormSubmitted() {
    console.log(this.signUpForm);
    const signUpFormData: signUpForm = this.signUpForm.value;
    console.log(`Sign up Form Data: ${JSON.stringify(signUpFormData)}`);
  }

  getEmailErrors(control: AbstractControl | null): string  {
    if (control?.hasError('required') && control?.touched) {
      return 'Email is a required field.';
    } else if (control?.hasError('email') && control?.touched) {
      return 'Enter a valid email address.';
    }
    return '';
  }

  get passwordErrors(): string {
    const passwordControl = this.signUpForm.get('password');
    if (
      passwordControl?.hasError('required') &&
      this.signUpForm.get('password')?.touched
    ) {
      return 'Password is required.';
    } else if (
      this.signUpForm.hasError('passwordMismatch') &&
      this.signUpForm.get('password')?.touched &&
      this.signUpForm.get('confirmpassword')?.touched
    ) {
      return 'Passwords do not match.';
    }
    return '';
  }
}
