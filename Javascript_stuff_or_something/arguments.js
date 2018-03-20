function sum(...args) {
  let result = 0;
  args.forEach(function(arg) {
    result = result + arg;
  });
  return result;
}

// console.log(sum(1, 2, 3, 4) === 10);


function sum2() {
  let args = Array.from(arguments);
  return args.reduce((acc, val) => acc + val);
}

// console.log(sum2(1, 2, 3, 4) === 10);

Function.prototype.myBind = function(context, ...bindArgs) {
  return (...callArgs) => {
    return this.apply(context, bindArgs.concat(callArgs));
  };
};


Function.prototype.myBind = function(context) {
  const bindArgs = Array.from(arguments).slice(1);
  let func = this;
  return function() {
    const callArgs = Array.from(arguments);
    return func.apply(context, bindArgs.concat(callArgs));
  };
};

class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}


const markov = new Cat("Markov");
const breakfast = new Cat("Breakfast");

console.log(markov.says("meow", "Ned"));
// Markov says meow to Ned!
// true

// bind time args are "meow" and "Kush", no call time args
console.log(markov.says.myBind(breakfast, "meow", "Kush")());
// Breakfast says meow to Kush!
// true

// no bind time args (other than context), call time args are "meow" and "me"
console.log(markov.says.myBind(breakfast)("meow", "a tree"));
// Breakfast says meow to a tree!
// true

// bind time arg is "meow", call time arg is "Markov"
console.log(markov.says.myBind(breakfast, "meow")("Markov"));
// Breakfast says meow to Markov!
// true

// no bind time args (other than context), call time args are "meow" and "me"
const notMarkovSays = markov.says.myBind(breakfast);
notMarkovSays("meow", "me");
// Breakfast says meow to me!
// true

function curriedSum(numArgs) {
  let numbers = [];

  const _curriedSum = function(num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      return numbers.reduce((acc, val) => acc + val);
    } else {
      return _curriedSum;
    }
  };

  return _curriedSum;
}

// const mySum = curriedSum(4);
// console.log(mySum(5)(30)(20)(1)); // => 56

Function.prototype.curry = function(numArgs) {
  let args = [];

  const _curriedFunc = (arg) => {
    args.push(arg);
    if (args.length === numArgs) {
      return this.apply(this, args);
    } else {
      return _curriedFunc;
    }
  };

  return _curriedFunc;
};


Function.prototype.curry2 = function(numArgs) {
  let args = [];

  const _curriedFunc = (arg) => {
    args.push(arg);
    if (args.length === numArgs) {
      return this(...args);
    } else {
      return _curriedFunc;
    }
  };

  return _curriedFunc;
};


const mySum = (a, b, c, d) => a + b + c + d;
const myCurriedSum = mySum.curry2(4);
console.log(myCurriedSum(1)(2)(3)(4));
