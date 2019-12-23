import {Component} from '@angular/core';
import {AuthService} from '../core/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
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

  tryRegister(value) {
    this.authService.doRegister(value)
      .then(() => {
        this.router.navigate(['/home']);
      }, err => {
        this.errorMessage = err.message;
        this.successMessage = '';
      });
  }
}
