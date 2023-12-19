export class Game {
  player: any = {
    id: null,
    name: 'Player',
    movements: 0,
  };
  dayInit: any = this.getDateFromTime();
  hourInit: string = this.getTime(Date.now());
  estadoFinal: string = '';

  tiles: any[] = [];
  difficult: string = 'Medium';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  getDateFromTime() {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const retorno = day + '/' + month + '/' + year;
    return retorno;
  }

  getTime(date: number) {
    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    return `${hours}:${minutes <= 9 ? `0${minutes}` : minutes}`;
  }
}
