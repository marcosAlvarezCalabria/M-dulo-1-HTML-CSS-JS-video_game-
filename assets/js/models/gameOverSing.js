class GameOverSing{
    constructor(ctx, x, y ){
        this.ctx = ctx,
        this.x = x,
        this.y = y,
        this.w= 300,
        this.h = 300,
        

        this.phraseGameOver = "GAME OVER"
        this.phraseYouWin  = "You win"
    }


    

    draw (){
        
        
       
   
        this.ctx.fillText (this.phraseGameOver, this.x, this.y, this.w, this.h)
    }

          
}
   
