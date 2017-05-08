const co = require('co');

/**
 * Declaring functions to return promises
 * If declared inline a promise will run immediately.
 */
function promiseOne() {
  let promiseOne = new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve('Promise One');
    }, 1000);
  });

  return promiseOne;
}

function promiseTwo() {
  let promiseTwo = new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve('Promise Two');
    }, 3000);
  });

  return promiseTwo;
}

function promiseThree() {
  let promiseThree = new Promise((resolve, reject) => {
    //What happens if we resolve after a reject.
    setTimeout(function () {
      resolve('Promise Three');
    }, 1000);
  });

  return promiseThree;
}

/**
 * Fig One.
 * Running promises sequentially with native syntax
 */
promiseOne().then(promiseOneValue => {
  console.log(promiseOneValue, "run next ...");
  promiseTwo().then((promiseTwoValue) => {
    console.log(promiseTwoValue, "Run next ...");
    promiseThree().then(promiseThreeValue => {
      console.log(promiseThreeValue, "All Promises Ran");
    }).catch(err => {

    });
  }).catch(err => {

  });
}).catch(err => {

});

// no nesting:
promiseOne()
  .then(val => {
    console.log(val, "run next ...");
    return promiseTwo();
  }).then(val => {
    console.log(val, "run next ...");
    return promiseThree();
  }).then(val => {
    console.log(val, "All Promises Ran");
  })
  .catch(err => {});

// a bit cleaner:
promiseOne()
  .then(val => console.log(val, "run next ..."))
  .then(promiseTwo)
  .then(val => console.log(val, "run next ..."))
  .then(promiseThree)
  .then(val => console.log(val, "All Promises Ran"))
  .catch(err => {});

// or, even cleaner (too clean?!):
const printWithMsg = (msg) => (val) => console.log(val, msg);

promiseOne()
  .then(printWithMsg("run next ..."))
  .then(promiseTwo)
  .then(printWithMsg("run next ..."))
  .then(promiseThree)
  .then(printWithMsg("All Promises Ran"))
  .catch(err => {});

/**
 * Fig Two.
 * Running promises sequentailly with generator syntax.
 * (Equivalent to Fig One)
 */
co(function* () {
  let promiseOneValue = yield promiseOne();
  console.log(promiseOneValue, "run next ...");
  let promiseTwoValue = yield promiseTwo();
  console.log(promiseTwoValue, "run next ...");
  let promiseThreeValue = yield promiseThree();
  console.log(promiseThreeValue, "All Promises Ran - with yield");
}).catch(error => {
  console.log('err', error);
});

/**
 * Fig Three.
 * Running promises in parallel with native promise syntax
 */
Promise.all([promiseOne(), promiseTwo(), promiseThree()]).then(values => {
  console.log(values, "All Promises Ran in parallel");
}).catch(error => {
  console.log("An error occured: "+ error);
});

/**
 * Fig Four.
 * Running promises in parallel with generator syntax
 * (Equivalent to Fig Three)
 */
co(function * (){
  let values = yield [promiseOne(), promiseTwo(), promiseThree()];
  console.log(values, "All Promises Ran in parallel - with yield");
}).catch(error => {
  console.log('err', error);
});;