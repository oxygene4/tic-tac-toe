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
  isGameOver = false;
  X_MARK = 'X';
  O_MARK = 'O';
  gameModel: string[] = ['', '', '', '', '', '', '', '', ''];
  winnerLine: string;
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

  get gameModelObject() {
    return {
      row1: [this.gameModel[0], this.gameModel[1], this.gameModel[2]],
      row2: [this.gameModel[3], this.gameModel[4], this.gameModel[5]],
      row3: [this.gameModel[6], this.gameModel[7], this.gameModel[8]],
      col1: [this.gameModel[0], this.gameModel[3], this.gameModel[6]],
      col2: [this.gameModel[1], this.gameModel[4], this.gameModel[7]],
      col3: [this.gameModel[2], this.gameModel[5], this.gameModel[8]],
      dia1: [this.gameModel[0], this.gameModel[4], this.gameModel[8]],
      dia2: [this.gameModel[2], this.gameModel[4], this.gameModel[6]]
    };
  }

  get winnerCells() {
    // todo fix winnerCells definition
    return this.gameModelObject[this.winnerLine] || [];
  }

  choosePlayer(chosenMark) {
    this.gameModel = ['', '', '', '', '', '', '', '', ''];
    this.currentPlayerMark = this.X_MARK;
    this.userMark = chosenMark;
    this.isGameOver = false;
    this.winnerLine = '';

    if (chosenMark !== this.X_MARK) {
      this.makeStep();
    }

    this.isPlaying = true;
  }

  userStepHandler(cellIndex) {
    if (this.gameModel[cellIndex] || this.isLoading || this.isGameOver) {
      return;
    }
    this.isLoading = true;
    this.gameModel[cellIndex] = this.userMark;
    this.checkWinner();
    this.makeStep();
  }

  makeStep() {
    this.game.getNextStep({player: this.opponentMark, game: this.gameModelForApi})
      .then((data: any) => {
        this.gameModel[data.recommendation] = this.opponentMark;
        this.checkWinner();
        this.isLoading = false;
      });
  }

  toggleCurrentPlayer() {
    this.currentPlayerMark = this.currentPlayerMark === this.X_MARK ? this.O_MARK : this.X_MARK;
  }

  checkWinner() {
    const finished = this.gameModel.every(Boolean);
    const filledLines = Object.entries(this.gameModelObject).filter(([_, cells]) => cells.every(Boolean));

    const hasWinnerLine = filledLines.find(([_, cells]) => {
      return cells.every((mark, index, self) => mark === self[0]);
    });

    this.winnerLine = hasWinnerLine ? hasWinnerLine[0] : '';
    this.isGameOver = finished || !!this.winnerLine;

    if (!this.isGameOver) {
      this.toggleCurrentPlayer();
    }
  }

  finishGame() {
    this.isPlaying = false;
  }

  logout() {
    this.authService.doLogout()
      .then(() => this.location.back(), error => console.log(error));
  }
}
