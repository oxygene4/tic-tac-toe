import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.scss']
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  errorMessage = '';
  isLoginMode = true;

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.isLoginMode = !!this.route.snapshot.paramMap.get('login');
  }

  changeAuthMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  createForm() {
    this.authForm = this.formBuilder.group({email: '', password: ''});
  }

  tryAuth(value) {
    if (this.isLoginMode) {
      this.tryLogin(value);
    } else {
      this.tryRegister(value);
    }
  }

  tryLogin(value) {
    this.authService.doLogin(value)
      .then(() => {
        this.router.navigate(['/home']);
      }, err => {
        this.errorMessage = err.message;
      });
  }

  tryRegister(value) {
    this.authService.doRegister(value)
      .then(() => {
        this.router.navigate(['/home']);
      }, err => {
        this.errorMessage = err.message;
      });
  }
}
