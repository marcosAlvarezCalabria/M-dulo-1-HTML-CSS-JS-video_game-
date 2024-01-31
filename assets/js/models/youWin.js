class SingYouWin {
  constructor(ctx, x, y) {
    (this.ctx = ctx),
      (this.x = 100),
      (this.y = 200),
      (this.w = 1200),
      (this.h = 674),
      (this.sprite = new Image());
    this.sprite.src = "/assets/img/background/dragonFinal.png";
    this.phrase = "You win ";
    this.time = "";
  }

  draw() {
    //this.ctx.drawImage (this.phrase, this.x, this.y, this.w, this.h)
    this.ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
    this.ctx.fillText(this.phrase, this.x, this.y, this.w, this.h);
  }

  showtime(time) {
    this.time = time;
    console.log(this.time);
  }
}
