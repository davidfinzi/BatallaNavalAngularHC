import { Injectable } from '@angular/core';
import { Game } from '../game/game';

export interface Tiles {
  used: boolean;
  value: number;
  state: string;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  playerId: number = 1;
  games: Game[] = [];
  finishedGames: any = localStorage.getItem('games') || '{"lostGames": []}';
  difficultList: string[] = ['Fácil', 'Medio', 'Difícil'];
  currentDifficult: string = 'Fácil';

  constructor() {}

  startGame() {
    if (!this.games.length) this.initGame();
  }

  getNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getGame(): Game[] {
    return this.games;
  }

  initGame(): GameService {
    let tiles: Tiles[][] = [];

    for (let i = 0; i < 10; i++) {
      tiles[i] = [];

      for (let j = 0; j < 10; j++) {
        tiles[i][j] = { used: false, value: 0, state: '' };
      }
    }

    tiles = this.randomShips(tiles, 10);

    let newGame = new Game({
      player: { id: this.createIdRandom(6), name: 'Jugador', movements: 0 },
      tiles: tiles,
    });

    this.games.push(newGame);

    return this;
  }

  randomShips(tiles: Tiles[][], len: number): Tiles[][] {
    const ships = [
      { size: 4, quantity: 1 },
      { size: 3, quantity: 2 },
      { size: 2, quantity: 3 },
      { size: 1, quantity: 4 }
    ];

    for (const ship of ships) {
      for (let i = 0; i < ship.quantity; i++) {
        let placed = false;
        while (!placed) {
          const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
          const startPos = this.getRandomPosition(len, ship.size, orientation);
          const { row, col } = startPos;

          if (this.canPlaceShip(tiles, row, col, orientation, ship.size)) {
            this.placeShip(tiles, row, col, orientation, ship.size);
            placed = true;
          }
        }
      }
    }

    return tiles;
  }

  getRandomPosition(len: number, size: number, orientation: string): { row: number, col: number } {
    const max = len - (orientation === 'horizontal' ? size - 1 : 0);
    const row = this.getNumber(0, max);
    const col = this.getNumber(0, max);
    return { row, col };
  }

  canPlaceShip(tiles: Tiles[][], row: number, col: number, orientation: string, size: number): boolean {
    const max = tiles.length;
    const minDistance = 1;
  
    if (
      (orientation === 'horizontal' && col + size > max) ||
      (orientation === 'vertical' && row + size > max)
    ) {
      return false;
    }
  
    for (let i = row - minDistance; i <= row + size + minDistance; i++) {
      for (let j = col - minDistance; j <= col + size + minDistance; j++) {
        if (i >= 0 && i < max && j >= 0 && j < max) {
          if (tiles[i][j].value === 1) {
            return false;
          }
        }
      }
    }
  
    return true;
  }

  createIdRandom(length: number): string {
    let result = '';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      result += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return result;
  }

  placeShip(tiles: Tiles[][], row: number, col: number, orientation: string, size: number): void {
    if (orientation === 'horizontal') {
      if (row >= 0 && row < tiles.length && col >= 0 && col + size <= tiles[0].length) {
        for (let i = 0; i < size; i++) {
          if (tiles[row][col + i]) {
            tiles[row][col + i].value = 1;
          }
        }
      }
    } else if (orientation === 'vertical') {
      if (col >= 0 && col < tiles[0].length && row >= 0 && row + size <= tiles.length) {
        for (let i = 0; i < size; i++) {
          if (tiles[row + i][col]) {
            tiles[row + i][col].value = 1;
          }
        }
      }
    }
  }
  
}
