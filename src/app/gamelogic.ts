import { Status } from './gamestatus';

export class Gamelogic {

  gameField: Array<number> = [];
  currentTurn: number | undefined;
  gameStatus: Status;
  winsSituationOne: Array<Array<number>> = [
    [1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 1],
    [0, 0, 1, 0, 1, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 0, 1],
  ];

  winsSituationTwo: Array<Array<number>> = [
    [2, 2, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 2, 2],
    [2, 0, 0, 2, 0, 0, 2, 0, 0],
    [0, 2, 0, 0, 2, 0, 0, 2, 0],
    [0, 0, 2, 0, 0, 2, 0, 0, 2],
    [0, 0, 2, 0, 2, 0, 2, 0, 0],
    [2, 0, 0, 0, 2, 0, 0, 0, 2],
  ];

  public constructor() {
    this.gameStatus = Status.STOP;
    this.gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  gameStart(): void {
    this.gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.currentTurn = this.randomPlayerStart();
    this.gameStatus = Status.START;
  }

  randomPlayerStart(): number {
    const startPlayer = Math.floor(Math.random() * 2) + 1;
    return startPlayer;
  }

  setField(position: string | null, value: number | undefined):void {
    // @ts-ignore
    this.gameField[position] = value;
  }

  getPlayerColorClass(): string {
    const colorClass = (this.currentTurn === 2) ? 'playerTwo' : 'playerOne';
    return colorClass;
  }

  changePlayer():void {
    this.currentTurn = (this.currentTurn === 2) ? 1 : 2;
  }

  arrayEquals(a: Array<any>, b: Array<any>): boolean {
    return Array.isArray(a) && Array.isArray(b) && a.length === b.length
      && a.every( (value, index) => value === b[index]);
  }

  async checkGameEndWinner(): Promise<boolean> {
    let isWinner = false;

    const checkArray = (this.currentTurn === 1) ? this.winsSituationOne : this.winsSituationTwo;
    // @ts-ignore
    const currentArray = [];

    this.gameField.forEach( (subfield, index) => {
      if(subfield !== this.currentTurn) {
        currentArray[index] = 0;
      } else {
        currentArray[index] = subfield;
      }
    })
    checkArray.forEach( (checkfield, checkindex) => {
      // @ts-ignore
      if(this.arrayEquals(checkfield, currentArray)) {
        isWinner = true;
      }
    });
    // @ts-ignore
    console.log(currentArray);

    if(isWinner) {
      this.gameEnd();
      return true;
    } else {
      return false;
    }
  }

  async checkGameEndFull(): Promise<boolean> {
    let isFull = true;

    if(this.gameField.includes(0)) {
      isFull = false;
    }
    if(isFull) {
      this.gameEnd();
      return true;
    } else {
      return false;
    }
  }

  gameEnd(): void {
    this.gameStatus = Status.STOP;
  }
}
