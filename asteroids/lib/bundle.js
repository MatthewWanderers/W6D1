/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(1);
const Asteroid = __webpack_require__(2);
const Game = __webpack_require__(4);
const GameView = __webpack_require__(5);

document.addEventListener('DOMContentLoaded', function () {
  window.MovingObject = MovingObject;
  const canvasEl = document.getElementById("game-canvas");
  window.ctx = canvasEl.getContext('2d');
  window.game = new Game(canvasEl);
  window.gameView = new GameView(window.game, window.ctx);
  window.gameView.start();
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

function MovingObject(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
}

MovingObject.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;

  ctx.beginPath();
  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

MovingObject.prototype.move = function() {
  let coordi = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
  this.pos = this.game.wrap(coordi);
};


module.exports = MovingObject;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(3);
const MovingObject = __webpack_require__(1);

const Asteroid = function(pos, game) {
  MovingObject.call(this, {
    color: Asteroid.COLOR,
    pos: pos,
    vel: Util.randomVec(10),
    radius: Asteroid.RADIUS,
    game: game
  });
};

Asteroid.COLOR = 'green';
Asteroid.RADIUS = 20;


Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

const Util = {
  inherits: function inherits(childClass, parentClass) {
    const Surrogate = function() {};
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate;
    childClass.prototype.constructor = childClass;
  },
  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  // Scale the length of a vector by the given amount.
  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },
};

module.exports = Util;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Asteroid = __webpack_require__(2);

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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(4);

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


/***/ })
/******/ ]);