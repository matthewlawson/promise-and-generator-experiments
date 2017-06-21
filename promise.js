const promiseOne = require('./lib/promises').promiseOne;
const promiseTwo = require('./lib/promises').promiseTwo;
const promiseThree = require('./lib/promises').promiseThree;

/**
 * Fig One.
 * Running promises sequentially 
 * - A bit of an ugly way to call them, dont do this.
 * 
 */
promiseOne().then(promiseOneValue => {
  promiseTwo().then((promiseTwoValue) => {
    promiseThree().then(promiseThreeValue => {
    }).catch(err => {

    });
  }).catch(err => {

  });
}).catch(err => {

});
/**
 * Fig Two, a nicer way of running sequentially
 * 
 * - Becomes a hassle when promise two needs to pass data to promise 3.
 */
promiseOne()
  .then(promiseTwo)
  .then(promiseThree)
  .catch(err => {

  });

/**
 * Fig Three, Passing data from one promise to another
 * - If the payload of promise one needs to be passed to promise 3 it needs to be declared outside of the scope.
 */
let promiseOnePayload;
promiseOne()
  .then(payload => {
    promiseOnePayload = payload;
    return promiseTwo(promiseOnePayload);
  })
  .then(payload => {
    return promiseThree(promiseOnePayload);
  });

/**
 * Fig Three.
 * Running promises in parallel
 */

Promise.all([promiseOne(), promiseTwo(), promiseThree()]).then(values => {
  console.log(values, "All Promises Ran in parallel");
}).catch(error => {
  console.log("An error occured: " + error);
});
