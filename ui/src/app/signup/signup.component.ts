import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../common/common.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private commonService: CommonService) { }

  signupForm: FormGroup
  submitted = false;
  errorMessage: string;
  successMessage: string;

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username:  ['', [Validators.required, Validators.pattern(/^[a-z0-9]+$/i), Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(8)]],
    }, { validator: this.checkIfMatchingPasswords('password', 'confirmpassword') });
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true })
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  get f() { return this.signupForm.controls; }

  signup() {
    this.submitted = true;

    if (this.signupForm.valid) {
      this.commonService.post('register', this.signupForm.getRawValue())
        .subscribe(successResponse => {
          this.commonService.setToken(successResponse.token, successResponse.username);
          this.successMessage = "User successfully created.";
          //this.router.navigate(['']);

        }, response => {
          this.errorMessage = response.error.message || '';
        })

    }
  }

}
