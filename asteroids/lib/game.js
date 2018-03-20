const Asteroid = require('./asteroid.js');

const Game = function (canvasEl) {
  this.asteroids = [];
  this.addAsteroids();
  canvasEl.height = 800;
  canvasEl.width = 800;
};

Game.DIM_X = 800;
Game.DIM_Y = 800;
Game.NUM_ASTEROIDS = 20;

Game.prototype.addAsteroids = function () {
  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    let pos = this.randomPosition();
    this.asteroids.push(new Asteroid(pos, this));
  }
};

Game.prototype.randomPosition = function () {
  const x = Math.random() * Game.DIM_X;
  const y = Math.random() * Game.DIM_Y;
  return [x, y];
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.asteroids.forEach(function (asteroid) {
    asteroid.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  this.asteroids.forEach(function (asteroid) {
    asteroid.move();
  });
};

Game.prototype.wrap = function (pos) {
  const x = this.wrapDims(pos[0], Game.DIM_X);
  const y = this.wrapDims(pos[0], Game.DIM_X);
  return [x, y];
};

Game.prototype.wrapDims = function (inate, dimMax) {
  if (inate < 0) {
    inate += dimMax;
  }
  return inate % dimMax;
};

module.exports = Game;
