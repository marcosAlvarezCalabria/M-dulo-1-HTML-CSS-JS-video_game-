class Enemy1 {
  constructor(ctx, x, y, assets) {
    this.ctx = ctx;
    this.y = y;
    this.x = x;
    this.vX = 5;
    this.w = 100;
    this.h = 100;

    this.sprite = new Image();
    this.sprite.src = assets.src;
    this.sprite.verticalFrames = assets.verticalFrames;
    this.sprite.verticalFramesIndex = assets.verticalFramesIndex;
    this.sprite.horizontalFrames = assets.horizontalFrames;
    this.sprite.horizontalFramesIndex = assets.horizontalFramesIndex;

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
    this.lives = 1;
  }

  move() {
    this.x -= this.vX;
  }
  clear() {
    this.ctx.clearRect(this.x, this.y, this.w, this.h);
  }

  collision(element) {
    return (
      this.x + this.w > element.x &&
      this.x < element.x + element.w &&
      this.y + this.h > element.y &&
      this.y < element.y + element.h
    );
  }

  draw() {
    if (this.sprite.isReady) {
      this.ctx.drawImage(
        this.sprite,
        this.sprite.horizontalFramesIndex * this.sprite.frameWidth,
        this.sprite.verticalFramesIndex * this.sprite.frameHeight,
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

  animate() {
    this.animationTick++;

    if (this.animationTick >= 25) {
      this.animationTick = 0;

      this.sprite.horizontalFramesIndex++;

      if (
        this.sprite.horizontalFramesIndex >
        this.sprite.horizontalFrames - 1
      ) {
        this.sprite.horizontalFramesIndex = 0;
      }
    }
  }
}
