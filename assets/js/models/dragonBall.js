class DragonBall{
    constructor(ctx, x, y)  {
        this.ctx = ctx;
        this.x   = x;
        this.y   = y;
        this.w   = 20;
        this.h   = 20;
        
        this.sprite = new Image();
        this.sprite.src = "/assets/img/spgoku/ball1.png";
        this.sprite.verticalFrames = 1;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrames = 1;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.onload = () => {
          this.sprite.isReady = true;
          this.sprite.frameWidth = Math.ceil(this.sprite.width / this.sprite.horizontalFrames);
          this.sprite.frameHeight = Math.ceil(this.sprite.height / this.sprite.verticalFrames);
        }
        this.quantityBalls= 0

    }
    animate (){
       
    }
    draw(){
        if (this.sprite.isReady/*&& this.quantityKi === 3*/ ) {
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
            )
           this.animate(); 
           
           
            
        }
    }
   
    
}