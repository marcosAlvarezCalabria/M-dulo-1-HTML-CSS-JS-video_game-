class Cloud {
    constructor (ctx, x, y){
        this.ctx = ctx,
        this.x = x,
        this.vX = 2,
        this.y = y,
        this.w = 50,
        this.h = 50;

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
        this.movements={
            right : false,
            left  : false,
        }  


    }
    draw ( ){
        
        if (this.sprite.isReady){
            this.ctx.drawImage (
                this.sprite,
                this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
                this.sprite.verticalFrameIndex * this.sprite.frameHeight,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                this.x,
                this.y,
                this.w,
                this.h,
               
            )
            


        }
    }
    move (gokuPositionX,gokuPositionY,movemenstsGokuRight,movemenstsGokuLeft,movementsGokuWalk,speedGoguX,gokuY0){
            this.x -= speedGoguX   
        

       if (gokuPositionX > this.x){
        
        this.x = gokuPositionX 
       }
       if (gokuPositionY === this.y){
        this.y = gokuPositionY
          this.y = gokuPositionY
       }
      
       /*if (gokuPositionX!==this.x){
        this.x = gokuPositionX
       }
         */
    }
    collision(element){
        console.log(`cloud.coliision llamada desde to ride `)
        return   (this.x + this.w > element.x &&
                 this.x < element.x + element.w &&
                 this.y + this.h > element.y &&
                 this.y < element.y + element.h
                 )
     
     }

    
    
    
   
}