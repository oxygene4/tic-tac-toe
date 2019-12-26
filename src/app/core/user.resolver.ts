import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, Router} from '@angular/router';
import {UserService} from '../services/user.service';

@Injectable()
export class UserResolver implements Resolve<any> {

  constructor(public userService: UserService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
        .then(res => resolve(res),
          err => {
            console.dir(err);
            this.router.navigate(['/landing']);
            return reject(err);
          });
    });
  }
}
