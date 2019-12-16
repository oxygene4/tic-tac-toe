import {Component, OnInit} from '@angular/core';
import {UserService} from '../core/user.service';
import {AuthService} from '../core/auth.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseUserModel} from '../core/user.model';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
  itemValue = '';
  items: Observable<any[]>;
  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    public db: AngularFireDatabase
  ) {
    this.items = db.list('items').valueChanges();
  }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      const data = routeData.data;
      if (data) {
        this.user = data;
        this.createForm(this.user.name);
      }
    });
  }

  onSubmit() {
    if (this.itemValue) {
      this.db.list('items').push({content: this.itemValue});
      this.itemValue = '';
    }
  }

  createForm(name) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required]
    });
  }

  save(value) {
    this.userService.updateCurrentUser(value).then(console.log);
  }

  logout() {
    this.authService.doLogout()
      .then(() => this.location.back(), (error) => console.log(error));
  }
}
