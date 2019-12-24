import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/auth.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {
  user: any;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      const user = routeData.data;
      if (user) {
        this.user = user;
      }
    });
  }

  logout() {
    this.authService.doLogout()
      .then(() => this.location.back(), error => console.log(error));
  }
}
