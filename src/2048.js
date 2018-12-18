"use strict";
const slideRow = require("./slideArray");

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

    let randomCell1 = this.getRandom();
    this.board[randomCell1.column - 1][randomCell1.row - 1] =
      randomCell1.value * 2;

    let randomCell2 = this.getRandom();
    while (
      randomCell1.column === randomCell2.column &&
      randomCell1.row === randomCell2.row
    ) {
      randomCell2 = this.getRandom();
    }
    this.board[randomCell2.column - 1][randomCell2.row - 1] =
      randomCell2.value * 2;
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
    for (let i = 0; i < edgeSize; i++) {
      this.board[i] = slideRow(this.board[i]);
    }
    const number = this.getNextValue();
    return this.board;
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

module.exports = Game;
