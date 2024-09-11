import { Component } from '@angular/core';
import { AuthenticationRequest } from '../services/models';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../services/services';
import { TokenService } from '../token.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule,RouterOutlet,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
    
  ) {}
register() {
  this.router.navigate(['register']);
}

login() {
  this.errorMsg = [];
  this.authService.authenticate({
    body: this.authRequest
  }).subscribe({
    next: (res) => {
      this.tokenService.token = res.token as string;
      this.router.navigate(['home']);
    },
    error: (err) => {
      console.log(err);
      this.errorMsg = err.error.type;
    }
});
}
}