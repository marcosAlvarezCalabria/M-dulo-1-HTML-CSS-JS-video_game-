class Cloud {
    constructor (ctx, x, y){
        this.ctx = ctx,
        this.x = x,
        this.vX = 2,
        this.y = y,
        this.w = 20,
        this.h = 20;

        this.sprite = new Image ()
        this.sprite.src = `/assets/img/spgoku/cloudAlone.png`;
        this.sprite.verticalFrames = 1;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrames= 1;
        this.sprite.horizontalFrameIndex =0; 
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.ceil(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.ceil(this.sprite.height / this.sprite.verticalFrames);
  
          }


    }
    draw ( ){
        
        if (this.sprite.isReady){
            this.ctx.drawImage (
                this.sprite,
                this.sprite.horizontalFrameIndex + this.sprite.framewidth,
                this.sprite.verticalFrameIndex * this.sprite.frameHeight,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                this.x,
                this.y,
                this.w,
                this.h,
                console.log("se pinta")
            )
            


        }
    }
   
}