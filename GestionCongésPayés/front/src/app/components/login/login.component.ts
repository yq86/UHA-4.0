import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Console } from 'console';
import { UserLogin } from 'src/app/models/user-login';
import { Token } from 'src/app/models/token';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { Payload } from 'src/app/models/payload';
import { User } from 'src/app/models/user';
import { LoginResponse } from 'src/app/models/login-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(
      private userService: UserService,
      private router: Router
  ) {}

  form!: UntypedFormGroup;
  userLogin!: UserLogin;
  user!: User;
  token!: Token;


  error: string | null | undefined;




  ngOnInit(): void {
    this.initForm();
  }


   initForm() { // initialize the form to create a drawing
    this.form = new UntypedFormGroup({
      username: new UntypedFormControl(''),
      password: new UntypedFormControl(''),
    });
  //  this.userLogin = { userName: "", password: "" };
  //  this.user = {};
  //  this.error = null;
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.userLogin = { userName: this.form.value.username, password: this.form.value.password };

    this.userService.login(this.userLogin).subscribe(
      (response: LoginResponse) => {
        if (response) {
          window.localStorage.setItem('name', this.form.value.username);
          window.localStorage.setItem('id', response.userid);
          window.localStorage.setItem('accessToken', response.accesstoken);
          this.router.navigate(['home']);
        } else {
          this.error = "username or password invalid";
          this.initForm();
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )

/*
   // example to use the token to access the database
    if (localStorage.getItem('accessToken')) {
      //this.token = { accessToken: localStorage.getItem('accessToken') };
      const accesstoken = localStorage.getItem('accessToken');
      this.userService.getAllUsers(accesstoken).subscribe(
        (res: any) => {
          if (res) {
            console.log(res)
          }
        }
      )
    }*/
  };

  initError() {
    this.error = null;
  }
}
