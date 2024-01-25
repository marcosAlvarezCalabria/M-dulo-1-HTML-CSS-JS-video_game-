class GameOverSing{
    constructor(ctx, x, y){
        this.ctx = ctx,
        this.x = x,
        this.y = y,
        this.w= 300,
        this.h = 300,

        this.phrase = "Game over"
    }

    draw (){
        this.ctx.fillText (this.phrase, this.x, this.y, this.w, this.h)
       
        
          
        }
   
}