class OndaVital {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.vX = SPEED_ONDA_VITAL;
    this.y = y;
    this.w = 100;
    this.h = 100;

    this.sprite = new Image();
    this.sprite.src = `/assets/img/spgoku/img-onda2.png`;
    this.sprite.verticalFrames = 1;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizontalFrames = 2;
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameWidth = Math.ceil(
        this.sprite.width / this.sprite.horizontalFrames
      );
      this.sprite.frameHeight = Math.ceil(
        this.sprite.height / this.sprite.verticalFrames
      );
    };
    this.animationTick = 0;
  }

  move() {
    this.x += this.vX;
  }
  animate() {
    this.animationTick++;

    if (this.animationTick >= 10) {
      this.animationTick = 0;

      this.sprite.horizontalFrameIndex++;

      if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
        this.sprite.horizontalFrameIndex = 0;
      }
    }
  }
  draw() {
    //this.ctx.fillRect (this.x, this.y, this.w, this.h)

    if (this.sprite.isReady) {
      this.ctx.drawImage(
        this.sprite,
        this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
        this.sprite.verticalFrameIndex * this.sprite.frameHeight,
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
}
