class CounterDragonBall {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.w = 10;
    this.h = 0;

    this.sprite = new Image();
    this.sprite.src = "";
    this.sprite.verticalFrames = 1;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizontalFrames = 1;
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameWidth = this.sprite.width;
      this.sprite.frameHeight = this.sprite.height;
    };
    this.quantityBalls = 0;
  }
  animate() {}
  draw() {
    if (this.sprite.isReady /*&& this.quantityKi === 3*/) {
      this.ctx.drawImage(
        this.sprite,
        this.sprite.horizontalFrameIndex, //* this.sprite.frameWidth,
        this.sprite.verticalFrameIndex, //* this.sprite.frameHeight,
        this.sprite.frameWidth,
        this.sprite.frameHeight,
        this.x,
        this.y,
        this.w,
        this.h
      );
      this.animate();
    }
  }
  updateCounter(counterBallsCaught) {
    switch (counterBallsCaught) {
      case 1:
        this.sprite.src = "/assets/img/spgoku/ball1counter.png";
        this.w = 50;
        this.h = 50;

        break;
      case 2:
        this.sprite.src = "/assets/img/spgoku/ball2counter.png";
        this.w = 75;
        this.h = 50;

        break;
      case 3:
        this.sprite.src = "/assets/img/spgoku/ball3counter.png";
        this.w = 100;
        this.h = 50;

        break;
      case 4:
        this.sprite.src = "/assets/img/spgoku/ball4counter.png";
        this.w = 125;
        this.h = 50;

        break;
      case 5:
        this.sprite.src = "/assets/img/spgoku/ball5counter.png";
        this.w = 150;
        this.h = 50;

        break;
      case 6:
        this.sprite.src = "/assets/img/spgoku/ball6counter.png";
        this.w = 175;
        this.h = 50;

        break;
      case 7:
        this.sprite.src = "/assets/img/spgoku/ball7counter.png";
        this.w = 200;
        this.h = 50;

        break;
    }
  }
}
