const EventEmitter = require('events').EventEmitter;

class MyEmitter extends EventEmitter {
  constructor() {
    super();
    this.on('newListener', (event, listener) => {
      console.log(`new listener registered [${event}]`);
    });
  }

  connect() {
    let payload = {data: 'DATA'}
    setTimeout(() => {
      this.emit("connected", payload);
    }, 3000);
  }

  process(payload) {
    setTimeout(() => {
      this.emit("processed", payload);
    }, 1000);
  }
}

const myEmitter = new MyEmitter();

myEmitter.once('connected', (payload) => {
  console.log("connected", payload);
  myEmitter.process(payload);
});

myEmitter.on("processed", (payload) => {
  console.log("processed", payload);
});

myEmitter.connect();