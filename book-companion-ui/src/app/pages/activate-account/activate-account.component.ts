import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent {

  message: string = '';
  isOkay: boolean = true;
  submitted: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  onCodeCompleted(activationToken: string) {
    this.confirmAccount(activationToken);
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  private confirmAccount(activationToken: string) {
    this.authService.confirm({
      token: activationToken
    }).subscribe({
      next: () => {
        this.message = 'Your account has been successfully activated,\nNow you can proceed to Login';
        this.submitted = true;
        this.isOkay = true;
      },
      error: () => {
        this.message = 'Token has been expired or invalid';
        this.submitted = true;
        this.isOkay = false;
      }
    })
  }
}
