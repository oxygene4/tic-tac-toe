import {Component} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToasterService} from '../services/toaster.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  authForm: FormGroup;
  isLoginMode = true;

  constructor(
    public authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toaster: ToasterService
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
    this.authService[this.isLoginMode ? 'doLogin' : 'doRegister'](value)
      .then(() => this.router.navigate(['/game']),
        err => this.toaster.showToast(err.message));
  }
}
