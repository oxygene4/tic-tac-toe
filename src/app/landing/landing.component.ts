import {Component} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  authForm: FormGroup;
  errorMessage = '';
  isLoginMode = true;

  constructor(
    public authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  changeAuthMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  createForm() {
    this.authForm = this.formBuilder.group({name: '', email: '', password: ''});
  }

  tryAuth(value) {
    const action = this.isLoginMode ? 'doLogin' : 'doRegister';

    this.authService[action](value)
      .then(() => {
        this.router.navigate(['/game']);
      }, err => {
        this.errorMessage = err.message;
      });
  }
}
