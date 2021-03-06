import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    public http: HttpClient,
    public userService: UserService,
  ) {
  }

  doRegister(form) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(form.email, form.password)
        .then(fbUserData => {
          const postData = {
            name: form.name || 'user',
            email: fbUserData.user.email,
            statistics: {
              played: 0,
              won: 0,
              lost: 0,
              drawn: 0,
              unfinished: 0
            }
          };

          this.http.post(`https://api.myjson.com/bins`, postData)
            .toPromise()
            .then((bin: any) => {
              this.userService.updateCurrentUser(bin.uri)
                .then(() => resolve(fbUserData));
            });
        }, err => reject(err));
    });
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(fbUserData => resolve(fbUserData),
          err => reject(err));
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut();
        resolve();
      } else {
        reject();
      }
    });
  }
}
