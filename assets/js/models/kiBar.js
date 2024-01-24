class KiBar{
    constructor(ctx, x, y)  {
        this.ctx = ctx;
        this.x   = x;
        this.y   = y;
        this.w   = WIDTH_KI_BAR;
        this.initialW = this.w;
        this.h   = HEIGHT_KI_BAR;
        
        this.sprite = new Image();
        this.sprite.src = "/assets/img/spgoku/kiBars.png";
        this.sprite.verticalFrames = 3;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrames = 1;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.onload = () => {
          this.sprite.isReady = true;
          this.sprite.frameWidth = Math.ceil(this.sprite.width / this.sprite.horizontalFrames);
          this.sprite.frameHeight = Math.ceil(this.sprite.height / this.sprite.verticalFrames);
        }
        this.quantityKi= 0

    }
    animate (){
        if (this.quantityKi === 2){
            this.sprite.verticalFramesIndex = 0

        }else if (this.quantityKi === 1) {
            this.sprite.verticalFramesIndex = 1

        }else if (this.quantityKi === 2) {
            this.sprite.verticalFramesIndex = 2

        }
    }
    draw(){
        if (this.sprite.isReady && this.quantityKi === 3 ) {
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
    updateQuantityki(){
        this.quantityKi ++
        console.log(`LA CANTIDAD DE KI +1 ES ${this.quantityKi}`)
    }
}