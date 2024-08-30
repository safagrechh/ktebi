import { Component, OnInit } from '@angular/core';
import {RegistrationRequest} from '../../services/models/registration-request';
import {AuthenticationService} from '../../services/services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  registerRequest: RegistrationRequest = {email: '', firstname: '', lastname: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }


  register() {
    localStorage.removeItem('token');
    this.errorMsg = [];
    this.authService.register({
      body: this.registerRequest
    })
      .subscribe({
        next: () => {
          this.router.navigate(['activate-account']);
        },
        error: (err) => {
          this.errorMsg = err.error.validationErrors || ['An unexpected error occurred. Please try again.'];
        }
      });
  }

  ngOnInit() {
  }

}
