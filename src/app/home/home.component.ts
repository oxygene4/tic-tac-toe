import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/auth.service';
import {GameService} from '../core/game.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {IUser} from '../core/user.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {
  user: IUser;
  userId: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private game: GameService,
    private http: HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      const user = routeData.data;
      if (user) {
        this.userId = user.displayName;

        this.http.get(this.userId)
          .toPromise()
          .then((userJson: IUser) => {
            this.user = userJson;
          });
      }
    });
  }

  logout() {
    this.authService.doLogout()
      .then(() => this.location.back(), error => console.log(error));
  }

  test() {
    this.game.test();
  }
}
