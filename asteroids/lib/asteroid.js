const Util = require("./util.js");
const MovingObject = require("./moving_object.js");

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
