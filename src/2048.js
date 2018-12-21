"use strict";
const slideArray = require("./slideArray");
const boardAction = require("./BoardAction");

const edgeSize = 4;

class Game {
  constructor() {
    this.reset();
  }

  getNextValue() {
    return (Math.floor(Math.random() * 2) + 1) * 2;
  }

  getRandom() {
    const newValue = this.getNextValue();
    const x = Math.floor(Math.random() * edgeSize);
    const y = Math.floor(Math.random() * edgeSize);
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

  playTurn(getAction, setAction) {
    let hadChanges = false;
    for (let i = 0; i < edgeSize; i++) {
      const oldValue = getAction(this.board, i);
      const newValue = slideArray(oldValue);
      hadChanges = this.compareArray(newValue, oldValue)
      setAction(this.board, i, newValue);
    }

    if (hadChanges) {
      this.addNewNumber();
    }  

    return this.board;
  }


  addNewNumber() {
    let randomCell;
    do {
      randomCell = this.getRandom();
    } while (!this.isBusy(this.board[randomCell.column][randomCell.row]));
    this.board[randomCell.column][randomCell.row] = randomCell.value;
  }

  compareArray(array1, array2) {
    return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
  }
  
  slideLeft() {
    return this.playTurn(boardAction.rowGetAction, boardAction.rowSetAction);
  }

  slideRight() {
    return this.playTurn(boardAction.reverseRowGetAction, boardAction.reverseRowSetAction);
  }

  slideUp() {
    return this.playTurn(boardAction.colGetAction, boardAction.colSetAction);
  }

  slideDown() {
    return this.playTurn(boardAction.reverseColGetAction, boardAction.reverseColSetAction);
  }
}

module.exports = Game;
