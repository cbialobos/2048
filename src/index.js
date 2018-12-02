"use strict";
const Game = require("./2048");

function printBoard(board) {
  board.forEach(row => console.log(row.map(x => `${x || "_"}`)));
}

let game = new Game();
printBoard(game.play());

const stdin = process.stdin;
stdin.setEncoding("utf8");
stdin.resume();
stdin.setRawMode(true);
stdin.on("data", key => {
  switch (key) {
    case "\u0003":
      process.exit();
      break;
    case "\u001b[A":
      console.log("up");
      printBoard(game.slideUp());
      break;
    case "\u001b[B":
      console.log("down");
      printBoard(game.slideDown());
      break;
    case "\u001b[D":
      console.log("left");
      printBoard(game.slideLeft());
      break;
    case "\u001b[C":
      console.log("right");
      printBoard(game.slideRight());
      break;
  }
});
