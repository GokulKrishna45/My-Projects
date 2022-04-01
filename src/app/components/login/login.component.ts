import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/view-model/login.model';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginModel: LoginModel;
  loggedInData: any;
  isSubmitted: boolean = false;
  isValid:boolean= true;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginModel = new LoginModel();
    this.loginForm = fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.isSubmitted = true;
    console.log(this.loginForm)
    this.loginModel.username = this.loginForm.value.username;
    this.loginModel.password = this.loginForm.value.password;
    if (this.validateCreds()) {
      
      if (this.loggedInData.permission == 'all' || this.loggedInData.permission == 'read') {
        this.router.navigate(['/post-listing'], { state: this.loggedInData });

      }
      else {
        this.router.navigate(['/create-post'], { state: this.loggedInData });

      }
      // alert("Login Success");
      this.isSubmitted = false;


    }

  }
  validateCreds() {
    this.loggedInData = this.authService.getLoggedInUserData(this.loginModel);
    if (this.loggedInData) {
      this.isValid = true;
      console.log(this.loggedInData)
      return true;
    }
    else {
      this.isValid = false;
      return false;
    }

  }

}
