import {Component, OnInit} from '@angular/core';
import {AuthenticationRequest} from "../../services/models/authentication-request";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {TokenService} from "../../services/token/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService,
    private activeRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      if (params['tokenExpired']) {
        this.errorMsg.push("Session expired. Please re-login");
      }
    })
  }

  login():void {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        this.tokenService.token = res.token as string;
        this.router.navigate(['books']);
      },
      error: (err) => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else if(err.error.errorDescription) {
          this.errorMsg.push(err.error.errorDescription);
        } else {
          this.errorMsg.push("Something went wrong. Try again later");
        }
      }
    });
  }

  register() {
    this.router.navigate(['register']);
  }
}
