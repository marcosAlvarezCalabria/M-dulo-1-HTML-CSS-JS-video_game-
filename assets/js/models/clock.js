class Clock {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.w = 400;
    this.h = 400;
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.formattedTime = "00:00:00";
  }

  draw() {
    this.ctx.font = "50px Roboto";
    this.ctx.fillText(this.formattedTime, this.x, this.y, this.w, this.h);
  }

  formatTime(seconds) {
    this.hours = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    this.minutes = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    this.seconds = (seconds % 60).toString().padStart(2, "0");
    this.formattedTime = `${this.hours}:${this.minutes}:${this.seconds}`;
  }

  updateClock() {
    this.formatTime(this.seconds);
    this.draw();
    this.seconds++;
  }

  startClock() {
    this.clockInterval = setInterval(() => {
      this.updateClock();
    }, 1000);
  }

  stopClock() {
    clearInterval(this.clockInterval);
  }

  resetClock() {
    this.stopClock();
    this.seconds = 0;
    this.updateClock();
  }
}
