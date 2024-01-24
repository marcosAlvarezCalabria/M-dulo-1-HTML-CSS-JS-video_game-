class SingLives {
    constructor (ctx, x, y){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 20;
        this.quantity = 3
        
    }
    draw() {
        this.ctx.fillText (this.quantity, this.x, this.y, this.w, this.h)
    }


    
   
}