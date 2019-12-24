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
    this.authForm = this.formBuilder.group({name: '', email: '12@12.12', password: '123123123'});
  }

  tryAuth(value) {
    const action =  this.isLoginMode ? 'doLogin' : 'doRegister';

    this.authService[action](value)
      .then(() => {
        this.router.navigate(['/home']);
      }, err => {
        this.errorMessage = err.message;
      });
  }
}
