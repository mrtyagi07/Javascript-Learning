'use strict';

/* const Person = function (firstName, birthYear) {
  //? Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  //* Never Do this
   this.calcAge = function () {
    console.log(2037 - this.birthYear);
  }; 
};

const vaibhav = new Person('Vaibhav', 2000);
console.log(vaibhav);

//! STEPS
//1. New {} is created
//2. function is called , this={}
//3. {} linked to prototype
//4. function automatically return {}

const klaus = new Person('Klaus', 1995);
const ragnar = new Person('Ragnar', 1990);
console.log(klaus, ragnar);

console.log(vaibhav instanceof Person);

//!Prototypes
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

vaibhav.calcAge();
ragnar.calcAge();

console.log(vaibhav.__proto__);
console.log(vaibhav.__proto__ === Person.prototype); //true

console.log(Person.prototype.isPrototypeOf(vaibhav)); //true
console.log(Person.prototype.isPrototypeOf(ragnar)); //true
console.log(Person.prototype.isPrototypeOf(Person)); //False
 */
//? .prototypeOfLinkedObjects
/* 
Person.prototype.species = 'Homo Sapiens';
console.log(vaibhav.species, ragnar.species);

console.log(vaibhav.hasOwnProperty('firstName'));
console.log(vaibhav.hasOwnProperty(''));
console.log(vaibhav.hasOwnProperty('species'));

console.log(vaibhav.__proto__); */
//!Object.prototype (Top of prototype chain)
/* console.log(vaibhav.__proto__.__proto__);
console.log(vaibhav.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [3, 6, 6, 5, 6, 9, 3]; // new Array ===[]
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(x => x + 1); */

//! Coding Challenge 1
/* console.log('----------Coding Challenge 1-----------');
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
const BMW = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

console.log(Car.prototype);

Car.prototype.acclerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

BMW.acclerate();
BMW.brake();
mercedes.acclerate();
mercedes.brake(); */

//! class declaration
// const PersonCl=class{}

//! class declaration
/* class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  //* Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet = function () {
    console.log(`Hey ${this.fullName}`);
  };

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log('Hey there! 👋');
    console.log(this);
  }
} */

// const damon = new PersonCl('Damon Tyagi', 1995);
// console.log(damon);
// damon.calcAge();
// console.log(damon.age);

// console.log(damon.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
//damon.greet();

//!Notes
//* 1. Classes are NOT hoisted
//* 2. Class are first-class citizens
//* 3. Classes are executed in Strict mode

/* const walter = new PersonCl('Walter White', 1965);

PersonCl.hey();

const account = {
  owner: 'Vaibhav',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);

account.latest = 50;
console.log(account.movements);

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();
 */

//! Coding challenge 2
// 1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
// 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide
// by 1.6)
// 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but
// converts it to km/h before storing the value, by multiplying the input by 1.6)
// 4. Create a new car and experiment with the 'accelerate' and 'brake'
// methods, and with the getter and setter.

/* class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelrate() {
    console.log(`${this.make} is driving at ${this.speed + 10}`);
  }

  brake() {
    console.log(`${this.make} is driving at ${this.speed - 5}`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl('Ford', 120);

ford.brake();
ford.accelrate();

console.log(ford.speedUS);
console.log(ford);
 */

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;

  //? Person(firstName, birthYear); //cannot set properties of undefined

  //! Whenever we call a constructor for inheritance, the THIS keyword points to undefined, so we have to set the THIS keyword first by the help of call()
  Person.call(this, firstName, birthYear);
  this.course = course;
};

//Linking Prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName}, and I am studying ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
// console.log(mike);
// mike.introduce();
// //mike.calcAge();

// console.log(mike.__proto__);
// console.log(mike.__proto__.__proto__);

// console.log(mike instanceof Student);
// console.log(mike instanceof Person);
// console.log(mike instanceof Object);

// Student.prototype.constructor = Student;
// console.dir(Student.prototype.constructor);

//! Coding Challenge 3

/* const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed = this.speed + 20;
  console.log(`${this.make} is going at ${this.speed}km/h`);
};
Car.prototype.brake = function () {
  this.speed = this.speed - 5;
  console.log(`${this.make} is going at ${this.speed}km/h`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
  console.log(
    `${this.make} is drive at ${this.speed} and charging percenatge is ${this.charge}`
  );
};

//Link the prototypes
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed}km/h, with a charge of ${this.charge}%`
  );
};

const car = new EV('BMW', 120, 30);
const ev = new EV('Tesla', 100, 59);
ev.chargeBattery(90);
ev.accelerate();
console.log(ev);
ev.brake();
ev.accelerate(); */

/* class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  //* Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet = function () {
    console.log(`Hey ${this.fullName}`);
  };

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log('Hey there! 👋');
    console.log(this);
  }
}

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    //Always need to happens first
    super(fullName, birthYear);
    this.course = course;
  }
  introduce() {
    console.log(
      `My name is ${this.fullName}, and I am studying ${this.course}`
    );
  }

  calcAge() {
    console.log(
      `Here ${this.fullName}, and I am ${
        this.age
      } but in College it's feel like ${this.age + 10}`
    );
  }
}

const vaibhav = new StudentCl('Vaibhav Tyagi', 2000, 'CS');
vaibhav.introduce();
vaibhav.calcAge();

////////////////////////////////////////////////////////////////
//! Inheritance between classes : Object.create

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

Student.introduce = function () {
  console.log();
};

const steven = Object.create(PersonProto);
 */

//* Public fields
//* Private fields
//* Public methods
//* Private methods
//* (there is also the static version)
class Account {
  //! 1) Public fields(instances)
  locale = navigator.language;

  //! 2) Private fields
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;

    //!Protected property
    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  //!Public methods
  // Public interface
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  // _approveLoan(val) {
  //   return true;
  // }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log('Yay! Loan Approved.');
      return this;
    }
  }
  //!Private methods
  // #approveLoan(val)
  _approveLoan(val) {
    return true;
  }

  //! static
  static helper() {
    console.log('Helper');
  }
}

const acc1 = new Account('Vaibhav', 'INR', 1111);
console.log(acc1);

// acc1.movements.push(200);
// acc1.movements.push(-150);
acc1.deposit(200);
acc1.withdraw(150);
acc1.requestLoan(1000);
console.log(acc1.getMovements());
//? Should not be accessed
// acc1.approveLoan(1000);

console.log(acc1);

//? Should not be accessed
console.log(acc1.pin);
Account.helper();

//console.log(acc1.#pin);//error
// console.log(acc1.#movements);//Uncaught SyntaxError: Private field '#movements'
//console.log(acc1.#approveLoan(120));

//! Chaining
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(2500).withdraw(4000);
console.log(acc1.getMovements());

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed = this.speed + 20;
    console.log(`${this.make} is going at ${this.speed}km/h`);
  }
  brake() {
    this.speed = this.speed - 5;
    console.log(`${this.make} is going at ${this.speed}km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} going at ${this.speed}km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
}

const tesla = new EVCl('Tesla', 100, 70);
tesla.brake();
tesla.chargeBattery(90);
console.log(tesla);
tesla.accelerate();
tesla
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(50)
  .accelerate();
console.log(tesla.speedUS);
