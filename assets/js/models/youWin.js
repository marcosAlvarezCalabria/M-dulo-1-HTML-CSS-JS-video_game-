class SingYouWin{
    constructor(ctx, x, y){
        this.ctx = ctx,
        this.x = x,
        this.y = y,
        this.w= 1000,
        this.h = 674,

        this.phrase = "YOU WIN !!!"
        this.sprite = new Image();
        this.sprite.src = "/assets/img/background/dragonFinal.png";
    }

    draw (){
        this.ctx.fillText (this.phrase, this.x, this.y, this.w, this.h)
        this.ctx.drawImage (this.sprite,this.x ,this.y,this.w,this.h)

       
        
          
        }
   
}