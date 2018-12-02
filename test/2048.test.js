const expect = require("expect");
const Game = require("../src/2048");

describe("2048", () => {
  it("should start with an empty grid", () => {
    const game = new Game();
    expect(game.board.every(row => row.every(cell => cell === null)));
  });

  it("A cell should be initialized on play", () => {
    const game = new Game();
    game.play();

    let cellInitialized = 0;
    game.board.forEach(row => {
      row.forEach(cell => {
        if (cell !== null) {
          cellInitialized++;
        }
      });
    });
    expect(cellInitialized).toBe(2);
  });

  it("Slide left should remove spaces", () => {
    const game = new Game();
    game.board = [
      [2, null, 4, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]
    ];

    expect(game.slideLeft()).toEqual([
      [2, 4, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]
    ]);
  });
});
