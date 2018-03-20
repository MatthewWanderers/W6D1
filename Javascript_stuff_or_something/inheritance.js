// Function.prototype.inherits = function (parent) {
//   const Surrogate = function () {};
//   Surrogate.prototype = parent.prototype;
//   this.prototype = new Surrogate;
//   this.prototype.constructor = this;
// };


Function.prototype.inherits = function(parent) {
  this.prototype = Object.create(parent.prototype);
  this.prototype.constructor = this;
};

function MovingObject () {
}

function Ship () {}
Ship.inherits(MovingObject);

function Asteroid () {}
Asteroid.inherits(MovingObject);

MovingObject.prototype.move = function () {
  return "I'm moved!";
};

Ship.prototype.shoot = function () {
  return "boom!";
};

Asteroid.prototype.crash = function () {
  return "cRaSh!";
};

const ship = new Ship;

const asteroid = new Asteroid;

console.log(ship.move);
console.log(ship.shoot);
console.log(ship.crash);
console.log(asteroid.move);
console.log(asteroid.shoot);
console.log(asteroid.crash);
