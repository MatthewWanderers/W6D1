const MovingObject = require('./moving_object.js');
const Asteroid = require('./asteroid.js');
const Game = require('./game.js');
const GameView = require('./game_view.js');

document.addEventListener('DOMContentLoaded', function () {
  window.MovingObject = MovingObject;
  const canvasEl = document.getElementById("game-canvas");
  window.ctx = canvasEl.getContext('2d');
  window.game = new Game(canvasEl);
  window.gameView = new GameView(window.game, window.ctx);
  window.gameView.start();
});
