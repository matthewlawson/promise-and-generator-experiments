function promiseOne() {
  let promiseOne = new Promise((resolve, reject) => {
    setTimeout(function () {
      console.log("promise one resolved");
      resolve('Promise One');
    }, 1000);
  });

  return promiseOne;
}

function promiseTwo(payload) {
  let promiseTwo = new Promise((resolve, reject) => {
    setTimeout(function () {
      console.log("promise Two resolved");
      resolve('Promise Two');
    }, 3000);
  });

  return promiseTwo;
}

function promiseThree() {
  let promiseThree = new Promise((resolve, reject) => {
    //What happens if we resolve after a reject.
    setTimeout(function () {
      console.log("promise three resolved");
      resolve('Promise Three');
    }, 1000);
  });

  return promiseThree;
}

module.exports = {
  promiseOne, promiseTwo, promiseThree
}