const Game = require('./game.js');

const GameView = function (game, ctx) {
  this.game = game;
  this.ctx = ctx;
};

GameView.prototype.start = function () {
  const game = this.game;
  const ctx = this.ctx;
  setInterval(function () {
    game.moveObjects();
    game.draw(ctx);
  }, 20);
};

module.exports = GameView;
