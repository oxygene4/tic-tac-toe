import {Component} from '@angular/core';
import {AuthService} from '../core/auth.service';
import {Router, Params} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  tryFacebookLogin() {
    this.authService.doFacebookLogin()
      .then(() => this.router.navigate(['/home']));
  }

  tryGoogleLogin() {
    this.authService.doGoogleLogin()
      .then(() => this.router.navigate(['/home']));
  }

  tryLogin(value) {
    this.authService.doLogin(value)
      .then(() => {
        this.router.navigate(['/home']);
      }, err => {
        this.errorMessage = err.message;
      });
  }
}
