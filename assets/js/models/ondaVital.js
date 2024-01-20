class OndaVital{
    constructor(ctx ,x ,y) {
        this.ctx = ctx;
        this.x   =   x;
        this.vX  =   SPEED_ONDA_VITAL
        this.y   =   y;
        this.w   =   10;
        this.h   =   10; 
        

    }
    
    move() { 
        
            this.x += this.vX
      console.log(`vx onda ++`)
        
    }
    draw() {
        this.ctx.fillRect (this.x, this.y, this.w, this.h)
    }
}