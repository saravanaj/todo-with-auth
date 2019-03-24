import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../common/common.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private commonService: CommonService) { }

  loginForm: FormGroup
  submitted = false;
  errorMessage: string;
  successMessage: string;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username:  ['', [Validators.required, Validators.pattern(/^[a-z0-9]+$/i), Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.submitted = true;

    if (this.loginForm.valid) {
      this.commonService.post('login', this.loginForm.getRawValue())
        .subscribe(successResponse => {
          this.commonService.setToken(successResponse.token, successResponse.username);
          this.successMessage = "Login successful.";
          //this.router.navigate(['']);
        }, response => {
          this.errorMessage = response.error.message || '';
        })

    }
  }

}
