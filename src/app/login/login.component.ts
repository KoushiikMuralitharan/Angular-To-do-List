import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  currentTab: 'login' | 'sign up' = 'login';
  loginForm!: FormGroup;

  ngOnInit(): void {
      this.loginForm = new FormGroup({
        useremail: new FormControl(null),
        password: new FormControl(null) 
      })
  }

  switchTab(tab: 'login'| 'sign up'):void {
    this.currentTab = tab;
  }

  OnFormSubmited(){
    console.log(this.loginForm);
  }
  
}
