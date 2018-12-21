"use strict";
import slideRow from "./slideArray";

const edgeSize = 4;

class Game {
  constructor() {
    this.reset();
  }

  getNextValue() {
    return Math.floor(Math.random() * (2 - 1) + 1);
  }

  getRandom() {
    const newValue = this.getNextValue();
    const x = Math.floor(Math.random() * (edgeSize - 1) + 1);
    const y = Math.floor(Math.random() * (edgeSize - 1) + 1);
    return { value: newValue, column: y, row: x };
  }

  play() {
    this.reset();

    this.addNewNumber();
    this.addNewNumber();

    return this.board;
  }

  reset() {
    this.board = [];
    for (let i = 0; i < edgeSize; i++) {
      let row = [];
      for (let j = 0; j < edgeSize; j++) {
        row.push(null);
      }
      this.board.push(row);
    }
  }

  isBoardFull() {
    return this.board.every(row => row.every(isBusy));
  }

  isBusy(value) {
    return value => value !== null;
  }

  slideLeft() {
    let hadChanges = false;
    for (let i = 0; i < edgeSize; i++) {
      const newLocal = slideRow(this.board[i]);
      hadChanges = this.compareArray(newLocal, this.board[i])
      this.board[i] = newLocal;
    }

    if (hadChanges) {
      const number = this.getNextValue();
      this.addNewNumber();
    }  

    return this.board;
  }


  playTurn(action) {
    let hadChanges = false;
    for (let i = 0; i < edgeSize; i++) {
      const newLocal = slideRow(this.board[i]);
      hadChanges = this.compareArray(newLocal, this.board[i])
      this.board[i] = newLocal;
    }

    if (hadChanges) {
      const number = this.getNextValue();
      this.addNewNumber();
    }  

    return this.board;
  }


  addNewNumber() {
    let randomCell = this.getRandom();
    while (
      !this.isBusy(this.board[randomCell.column - 1][randomCell.row - 1])) {
        randomCell = this.getRandom();
    }
    this.board[randomCell.column - 1][randomCell.row - 1] =
    randomCell.value * 2;
  }

  compareArray(array1, array2) {
    return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
  }
  
  slideRight() {
    for (let i = 0; i < edgeSize; i++) {
      this.board[i] = slideRow(this.board[i].reverse()).reverse();
    }
    return this.board;
  }

  slideUp() {
    for (let i = 0; i < edgeSize; i++) {
      this.setColumnValues(i, slideRow(this.getColumnValues(i)));
    }
    return this.board;
  }

  slideDown() {
    for (let i = 0; i < edgeSize; i++) {
      this.setColumnValues(i, slideRow(this.getColumnValues(i).reverse()).reverse());
    }
    return this.board;
  }

  getColumnValues(colIndex) {
    let values = [];
    for (let i = 0; i < edgeSize; i++) {
      values.push(this.board[i][colIndex]);
    }
    return values;
  }

  setColumnValues(colIndex, values) {
    for (let i = 0; i < edgeSize; i++) {
      this.board[i][colIndex] = values[i];
    }
  }
}

export default Game;
