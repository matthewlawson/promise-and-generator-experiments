const co = require('co');
const promiseOne = require('./lib/promises').promiseOne;
const promiseTwo = require('./lib/promises').promiseTwo;
const promiseThree = require('./lib/promises').promiseThree;

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

