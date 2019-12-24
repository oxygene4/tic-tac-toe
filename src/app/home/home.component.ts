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
  isPlaying = false;
  isLoading = false;
  X_MARK = 'X';
  O_MARK = 'O';
  gameModel: string[] = ['', '', '', '', '', '', '', '', ''];
  userMark = this.X_MARK;
  currentPlayerMark = this.X_MARK;

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

  get gameModelForApi() {
    return this.gameModel.map((mark: string) => mark || '-').join('');
  }

  get opponentMark() {
    return this.userMark === this.X_MARK ? this.O_MARK : this.X_MARK;
  }

  choosePlayer(chosenMark) {
    this.gameModel = ['', '', '', '', '', '', '', '', ''];
    this.currentPlayerMark = this.X_MARK;
    this.userMark = chosenMark;

    if (chosenMark !== this.X_MARK) {
      this.makeStep();
    }

    this.isPlaying = true;
  }

  userStepHandler(cellIndex) {
    if (this.gameModel[cellIndex] || this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.gameModel[cellIndex] = this.userMark;
    this.checkWinner();
    this.toggleCurrentPlayer();
    this.makeStep();
  }

  makeStep() {
    this.game.getNextStep({player: this.opponentMark, game: this.gameModelForApi})
      .then((data: any) => {
        this.gameModel[data.recommendation] = this.opponentMark;
        this.checkWinner();
        this.toggleCurrentPlayer();
        this.isLoading = false;
      });
  }

  toggleCurrentPlayer() {
    this.currentPlayerMark = this.currentPlayerMark === this.X_MARK ? this.O_MARK : this.X_MARK;
  }

  checkWinner() {
    const gameModel = this.gameModel;
    const matrix = {
      row1: [gameModel[0], gameModel[1], gameModel[2]],
      row2: [gameModel[3], gameModel[4], gameModel[5]],
      row3: [gameModel[6], gameModel[7], gameModel[8]],
      col1: [gameModel[0], gameModel[3], gameModel[6]],
      col2: [gameModel[1], gameModel[4], gameModel[7]],
      col3: [gameModel[2], gameModel[5], gameModel[8]],
      dia1: [gameModel[0], gameModel[4], gameModel[8]],
      dia2: [gameModel[2], gameModel[4], gameModel[6]]
    };

    const result = Object.entries(matrix).find(([_, cells]) => {
      return cells.every(Boolean) && cells.every( (mark, index, self) => mark === self[0] );
    });

    console.log(result);
  }

  finishGame() {
    this.isPlaying = false;
  }

  logout() {
    this.authService.doLogout()
      .then(() => this.location.back(), error => console.log(error));
  }
}
