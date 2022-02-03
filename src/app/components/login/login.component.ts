import { Router } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public btnLoading: boolean = false;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });


  }

  public onSubmit(loginForm: FormGroup) {
    this.btnLoading = true;
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify(loginForm.value));
      this.router.navigate(['dashboard']);
    }, 1500);

  }
}
