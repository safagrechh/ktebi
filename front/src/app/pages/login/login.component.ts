import { Component, OnInit, OnDestroy } from '@angular/core';
import {AuthenticationRequest} from '../../services/models/authentication-request'
import {AuthenticationService} from '../../services/services/authentication.service';
import {Router} from '@angular/router';
import {TokenService} from '../../services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService:  TokenService  ,
  ) {}

  authRequest: AuthenticationRequest = {email : '' , password : ''} ;

  errorMsg: Array<string> = [];

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  login() {

    localStorage.removeItem('token');

    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        this.tokenService.token = res.token as string;
        this.router.navigate(['book']);
      },
      error: (err) => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.errorMsg);
        }
      }
    });
  }

  registerr() {
    this.router.navigate(['register']);


  }
}
