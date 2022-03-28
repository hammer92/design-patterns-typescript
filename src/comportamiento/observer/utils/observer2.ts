const { EventEmitter } = require("events");

class CountDown extends EventEmitter {
  constructor(countdownTime) {
    super();
    this.countdownTime = countdownTime;
    this.currentTime = 0;
  }

  startTimer() {
    console.log("startTimer");
    this.emit("update", this.currentTime);
    const timer = setInterval(() => {
      this.currentTime++;
      this.emit("update", this.currentTime);

      // Check if countdown has reached to the end
      if (this.currentTime === this.countdownTime) {
        clearInterval(timer);
        this.emit("end");
      }

      // Check if countdown will end in 2 seconds
      if (this.currentTime === this.countdownTime - 2) {
        this.emit("end-soon");
      }
    }, 1000);
  }
}

const myCountDown = new CountDown(5);

myCountDown.on("update", (t) => {
  console.log(`${t} seconds has been passed since the timer started`);
});

myCountDown.on("end", () => {
  console.log("Countdown is completed");
});

myCountDown.startTimer();
