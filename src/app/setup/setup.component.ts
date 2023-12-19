import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.sass'],
})
export class SetupComponent implements OnInit {
  camposelect: any = [];
  option: string = 'Easy';
  constructor(private gameServices: GameService) {}

  ngOnInit(): void {
    this.camposelect = this.gameServices.difficultList;
  }

  initGame() {
    localStorage.removeItem('game');
    this.gameServices.startGame();
    this.gameServices.currentDifficult = this.option;
  }
}
