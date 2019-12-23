import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {UserService} from '../core/user.service';
import {AuthService} from '../core/auth.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseUserModel} from '../core/user.model';
import {AngularFireDatabase} from '@angular/fire/database';

// import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {
  // itemValue = '';
  // items: Observable<any[]>;
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
    // this.items = db.list('items').valueChanges();
  }

  @ViewChild('updateNameLink', {static: false}) updateNameLink: ElementRef;
  @ViewChild('updateNameHint', {static: false}) updateNameHint: ElementRef;

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      const user = routeData.data;
      if (user) {
        this.user = user;
        this.createForm(this.user.name);
      }
    });
  }

  // onSubmit() {
  //   if (this.itemValue) {
  //     this.db.list('items').push({content: this.itemValue});
  //     this.itemValue = '';
  //   }
  // }

  createForm(name) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required]
    });
  }

  save(value) {
    this.userService.updateCurrentUser(value)
      .then(() => this.toggleUpdateNameLink('none'));
  }

  logout() {
    this.authService.doLogout()
      .then(() => this.location.back(), error => console.log(error));
  }

  toggleUpdateNameLink(show) {
    this.updateNameLink.nativeElement.style.display = show;
    this.updateNameHint.nativeElement.style.display = show === 'inline' ? 'none' : 'inline';
  }
}
