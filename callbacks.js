function connect(options, callback) {
  setTimeout(() => {
    callback(null, {data: 'data', connected: true});
  }, 3000);
}

function process(options, callback) {
  setTimeout(() => {
    callback(null, {data: 'processed_data'});
  }, 3000);
}



//Running the callbacks ...
/**
 * Fig One - Anonymous Callback Pyramids
 */

connect({}, (err, payload) =>  {
  console.log("connected");
  process(payload.data, (err, payload) => {
    console.log("processed", payload);
  });
});

/**
 * Fig Two - Named callbacks 
 */


connect({}, connected);

function connected(err, payload) {
  console.log("connected");
  process(payload.data, processed);
}

function processed(err, payload) {
  console.log("processed", payload);
}