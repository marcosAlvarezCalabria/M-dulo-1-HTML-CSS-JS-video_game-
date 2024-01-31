class HealthBar {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.y = y;
    this.x = x;
    this.w = WIDTH_HEALTH_BAR;
    this.initialW = this.w;
    this.h = HEIGHT_HEALTH_BAR;

    this.sprite = new Image();
    this.sprite.src = "/assets/img/spgoku/sprite-live-1.png";
    this.sprite.verticalFrames = 1;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizontalFrames = 1;
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
    this.quantityLive = 3;
  }
  animate() {
    if (this.quantityLive === 3) {
      this.sprite.src = "/assets/img/spgoku/sprite-live-1.png";
    } else if (this.quantityLive === 2) {
      this.sprite.src = "/assets/img/spgoku/sprite-live-2.png";
    } else if (this.quantityLive === 1) {
      this.sprite.src = "/assets/img/spgoku/sprite-live-4.png";

      setTimeout(() => {
        this.sprite.src = "/assets/img/spgoku/sprite-live-1.png";
        this.quantityLive = 3;
      }, 1000);
    }
  }

  draw() {
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

  updateHealthBar() {
    if (this.quantityLive === 0) {
      this.quantityLive = 3;
    }
  }
}
