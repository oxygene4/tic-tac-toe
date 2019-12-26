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
  isPlaying = false;
  isLoading = false;
  isGameOver = false;
  isResultShown = false;
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
        this.http.get(user.displayName)
          .toPromise()
          .then((userJson: IUser) => {
            const {played, won, lost, drawn, unfinished} = userJson.statistics;
            const correctStat = played - won - lost - drawn === unfinished;

            this.user = userJson;
            this.user.displayName = user.displayName;

            if (!correctStat) {
              this.updateStatistics('all');
            }
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

  choosePlayer(chosenMark) {
    this.userMark = chosenMark;

    if (chosenMark !== this.X_MARK) {
      this.makeStep();
    }

    this.isPlaying = true;
    this.updateStatistics('played');
  }

  userStepHandler(cellIndex) {
    if (this.gameModel[cellIndex] || this.isLoading || this.isGameOver) {
      return;
    }

    this.gameModel[cellIndex] = this.userMark;
    this.checkState();

    if (!this.isGameOver) {
      this.makeStep();
    }
  }

  makeStep() {
    this.isLoading = true;

    this.game.getNextStep({player: this.opponentMark, game: this.gameModelForApi})
      .then((data: any) => {
        this.gameModel[data.recommendation] = this.opponentMark;
        this.checkState();
        this.isLoading = false;
      });
  }

  toggleCurrentPlayer() {
    this.currentPlayerMark = this.currentPlayerMark === this.X_MARK ? this.O_MARK : this.X_MARK;
  }

  checkState() {
    const finished = this.gameModel.every(Boolean);
    const filledLines = Object.entries(this.gameModelObject).filter(([_, cells]) => cells.every(Boolean));
    const hasWinnerLine = filledLines.find(([_, cells]) => {
      return cells.every((mark, index, self) => mark === self[0]);
    });

    this.winnerLine = hasWinnerLine ? hasWinnerLine[0] : '';
    this.isGameOver = finished || !!this.winnerLine;

    if (finished && !this.winnerLine) {
      this.isGameOver = true;
      this.isResultShown = true;
      this.updateStatistics('drawn');
    } else if (this.winnerLine) {
      const userWon = this.userMark === this.currentPlayerMark;

      this.isGameOver = true;
      this.isResultShown = true;
      this.updateStatistics(userWon ? 'won' : 'lost');
    } else {
      this.toggleCurrentPlayer();
    }
  }

  resetGame() {
    this.gameModel = ['', '', '', '', '', '', '', '', ''];
    this.currentPlayerMark = this.X_MARK;
    this.isGameOver = false;
    this.isResultShown = false;
    this.winnerLine = '';
    this.isPlaying = false;
  }

  updateStatistics(key) {
    if (key === 'all') {
      const {played, won, lost, drawn} = this.user.statistics;
      this.user.statistics.unfinished = played - won - lost - drawn;
    } else {
      this.user.statistics[key]++;
    }

    this.game.sendStatToServer(this.user)
      .then((user: IUser) => {
        this.user.statistics = user.statistics;
      });
  }

  logout() {
    this.authService.doLogout()
      .then(() => this.location.back());
  }
}
