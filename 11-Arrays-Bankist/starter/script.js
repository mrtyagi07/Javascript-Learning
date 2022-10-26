'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}💶</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} 💶`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}💶`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${out}💶`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}💶`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  //Display movements
  displayMovements(acc.movements);
  //Display balance
  calcDisplayBalance(acc);
  //Display Summary
  calcDisplaySummary(acc);
};

//Event Handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //Clear the input field
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    //update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.userName !== currentAccount.userName
  ) {
    //Doing the Transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //Add the movement
    currentAccount.movements.push(amount);

    //Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//SLICE
/* let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
console.log(arr.slice());

//SPLICE(It will mutate the Array)
// console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);

//Reverse (mutate the Array)

arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());

//CONCAT (Muatate the Array)
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

//JOIN
console.log(letters.join(' - ')); */

//NEW
/* const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

//getting the last element of array
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

console.log('Vaibhav'.at(0));
console.log('Vaibhav'.at(-2)); */

/* const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// for (const movement of movements)
for (const [i, movement] of movements.entries()) {
  if (movement > 0) console.log(`Movement: ${i + 1}:You deposited ${movement}`);
  else console.log(`Movement: ${i + 1}: You withdrew ${Math.abs(movement)}`);
}

console.log('----FOREACH-----');
movements.forEach(function (movement, i, arr) {
  if (movement > 0) console.log(`Movement: ${i + 1}:You deposited ${movement}`);
  else console.log(`Movement: ${i + 1}: You withdrew ${Math.abs(movement)}`);
}); */

//
//?0:function(200)
//?1:function(450)
// ......
/**
 * !Cant break out of loop forEach so if you want to loop over entire array use forEach
 * todo Try different examples to practice forEach
 * * Better to use forEach suitable one
 */

/* //MAP
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
currencies.forEach(function (value, key, map) {
  console.log(`${key}:${value}`);
});

console.log('----SET------');

//SET
const cuurenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
cuurenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}:`);
}); */

// Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// § Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

//! Coding Challenge
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  const dogs = dogsJuliaCorrected.concat(dogsKate);

  dogs.forEach(function (max, i) {
    console.log(
      `${
        max < 3
          ? `Dog number ${i + 1} is a Puppy, and is ${max} years old`
          : `Pet number ${i + 1} is an Adult,and is ${max} years old`
      }`
    );
  });
  // dogsJulia.forEach(function (max) {
  //   console.log(`${max < 3 ? 'Julia pet is Puppy' : 'Julia pet is Adult'}`);
  // });
  // dogsKate.forEach(function (max) {
  //   console.log(`${max < 3 ? 'Kate pet is Puppy' : 'Kate pet is Adult'}`);
  // });
};

// const julia = [3, 5, 2, 12, 7];
// const kate = [4, 1, 15, 8, 3];
// julia.splice(0, 1);
// julia.splice(-2);
// console.log(julia);
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/* const euroToUsd = 1.1;
//!Map method won't mutate the original array
const movementsUSD = movements.map(function (mov) {
  return mov * euroToUsd;
});
console.log(movements);
console.log(movementsUSD);
//! Or we can write it as
const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * euroToUsd);
console.log(movementsUSDfor);
//! Or we can write using Arrow Function
const movementsUSDArrow = movements.map(mov => mov * euroToUsd);
console.log(movementsUSDArrow);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement: ${i + 1}:You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions); */

//! Filter Methods
/* const deposits = movements.filter(function (mov) {
  return mov > 0;
});

console.log(movements);
console.log(deposits);
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withDrawls = movements.filter(function (mov) {
  return mov < 0;
});

console.log(withDrawls);

console.log('----Arrow-----');

const withDrawlsArrow = movements.filter(mov => mov < 0);
console.log(withDrawlsArrow); */

//!Reduced Method

/* const arr = [3, 1, 4, 5, 2];
const sum = arr.reduce(function (sum, element) {
  const updatedSum = sum + element;
  return updatedSum;
}, 0);
console.log(sum); //15

const average1 = arr.reduce(function (a, b) {
  return (a + b) / arr.length;
});
console.log(average);
const average = arr => arr.reduce((a, b) => a + b) / arr.length;
average([1, 9, 18, 36]); */

//accumulator -> SNOWBALL
// const balance = movements.reduce(function (acc, curr, i, arr) {
//   console.log(`Iteration ${i}:${acc}`);
//   return acc + curr;
// }, 0);

// const balance = movements.reduce((acc, curr) => acc + curr, 0);

// console.log(balance);

//!Maximum Value
// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) return acc;
//   else return mov;
// }, movements[0]);
// console.log(max);
/* const arr = [15, 5, 1, 4, 9, 25, 12, 0, 20];
const max = arr.reduce((acc, curr) => {
  if (acc > curr) return acc;
  else return curr;
}, arr[0]);
console.log(max); //25 */

//! Coding challenge 3

// : if the dog is
// <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
// humanAge = 16 + dogAge * 4

// const dogAges = [5, 2, 4, 1, 15, 8, 3];
// const calcAverageHumanAge = dogAges.map(function (age) {
//   if (age <= 2) return 2 * age;
//   else if (age > 2) return 16 + age * 4;
// });

// const humanAges = calcAverageHumanAge.filter(hAge => hAge > 18);
// const average = humanAges.reduce((a, b) => a + b, 0) / humanAges.length;

// console.log(average);

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age > 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
//   return humanAges;
//2 3. (2+3)/2=2.5 ====2/2+3/2=2.5

// const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
// const average = adults.reduce(
//   (acc, age, i, arr) => acc + age / arr.length,
//   0
// );
//2 3. (2+3)/2=2.5 ====2/2+3/2=2.5
// return average;
// };
// const testData1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const testData2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(testData1, testData2);

//!Pipeline
// const eurToUSD = 1.1;
// console.log(movements);

// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map((mov, i, arr) => {
//     console.log(arr);
//     return mov * eurToUSD;
//   })
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsUSD);

// const arr = [2, 5, 0, 6, 7, 12, 5, 14, 10];

// const findElement = arr.find(ele => ele > 10);
// console.log(findElement); //12
//! findIndex() indexOf() =>
//! The difference is indexOf we can find that certain element is present or not while findIndex() we can give the complex condition to find an element in an array

// const arr = [2, 4, 5, 10, 0, 8, 5];

// const findIndex = arr.findIndex(element => element > 5);
// console.log(findIndex); //3

// console.log(arr.indexOf(1)); // -1
// console.log(arr.indexOf(3)); //5

// const netflixArray = ['lucifer', 'ragnar', 'klaus', 'damon', 'Joe'];

// console.log(netflixArray.indexOf('klaus')); //2

// const arr = [200, 120, 5, 432, 45, 3444, 23, 4, 500, 6, 5555, 3535];
// console.log(arr.includes(432)); //true
// const resultSome = arr.some(ele => ele < 0);
// console.log(resultSome); //false
// const resultEvery = arr.every(ele => ele > 1);
// console.log(resultEvery); //true

const array = [1, 2, 3, 4, 5];

// checks whether an element is even
const even = element => element % 2 === 0;

console.log(array.every(even));
// expected output: true

/* //! Some
console.log(movements);

//Equality
console.log(movements.includes(-130));

//Condition

const anyDeposists = movements.some(mov => mov > 1500);
console.log(anyDeposists);

//!Every
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));
//Even number using every
const even = [2, 4, 6, 10, 100, 200, 12, 56];
console.log(even.every(ele => ele % 2 === 0));

//Separate Callback (DRY)
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit)); */

/* const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, 5, 6], 7, 8];
console.log(arrDeep.flat(2));

const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

//flatMap
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2); */

//Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

//Numbers
console.log(movements);
console.log(movements.sort());

//! sort() method sort the array by converting number into string so it will sort according to string

//return<0 A,B (keep order)
//return>0 B,A(switch order)

/* //Ascending
movements.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return 1;
});

movements.sort((a, b) => a - b);
console.log(movements);

//Descending
movements.sort((a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
});

movements.sort((a, b) => b - a);
console.log(movements); */
/* const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));
//Empty arrays+fill method
const x = new Array(7);
console.log(x); //! Will create empty array of 7 Elements
// console.log(x.map(() => 5));
// x.fill(1);
x.fill(1, 3, 5);
console.log(x);

arr.fill(23, 2, 6);
console.log(arr);

//Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => ++i);
console.log(z); */
// console.log(Math.floor(Math.random() * 6) + 1);

/* const dice = Array.from(
  { length: 100 },
  () => Math.floor(Math.random() * 6) + 1
);
console.log(dice); */

/* labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements_value'),
    el => Number(el.textContent.replace('💶', ''))
  );
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements_value')];
});
 */

//! Array methods practice
//1)
/* const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, curr) => acc + curr, 0);

console.log(bankDepositSum); */
//2
/* const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length; */

/* const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, curr) => (curr >= 1000 ? ++count : count), 0);

console.log(numDeposits1000);

//3

const { deposits, withdrawls } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, curr) => {
      // curr > 0 ? (sums.deposits += curr) : (sums.withdrawls += curr);
      sums[curr > 0 ? 'deposits' : 'withdrawls'] += curr;
      return sums;
    },
    { deposits: 0, withdrawls: 0 }
  );
console.log(deposits, withdrawls); */

//4)
// this is a nice title-> This Is a Nice Title

/* const convertTitleCase = function (title) {
  const captalize = str => str[0].toUpperCase() + str.slice(1);

  const expections = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (expections.includes(word) ? word : captalize(word)))
    .join(' ');
  return captalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE')); */

//Coding Challenge
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
//1
dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));

//2
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(
  `Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
  }`
);

//3
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
// .flat();
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
// .flat();
console.log(ownersEatTooLittle);

//4)
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

//5)
console.log(dogs.some(dog => dog.curFood === dog.recFood));

//6
const checkEatingOkay = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;
console.log(dogs.some(checkEatingOkay));

//7
console.log(dogs.filter(checkEatingOkay));

//8
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);
