import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class GameService {
  baseUrl = environment.rapidApiTicTacToe.base;
  apiKey = environment.rapidApiTicTacToe.key;
  apiHost = environment.rapidApiTicTacToe.host;
  httpOptions = {
    headers: new HttpHeaders()
      .set('x-rapidapi-host', this.apiHost)
      .set('x-rapidapi-key', this.apiKey)
  };

  constructor(private http: HttpClient) {
  }

  startGame() {
    this.test();
  }

  test() {
    const game = '---------';
    const player = 'X';

    this.http.get(`${this.baseUrl}${game}/${player}`, this.httpOptions).toPromise().then(console.dir);
  }
}
