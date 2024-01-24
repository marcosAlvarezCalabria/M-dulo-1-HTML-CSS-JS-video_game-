class Score {
    constructor (ctx, x, y , points = 0){
        this.ctx = ctx;
        this.x   =  x;
        this.y   =  y;
        this.w   = 20;
        this.h   = 20;

        this.points = points;
    }
    draw(){
        this.ctx.fillText (this.points, this.x , this.y ,this.w ,this.h )
        
        this.ctx.font = "50px Roboto"
        this.ctx.style = "yelow"
    }
    
  
}