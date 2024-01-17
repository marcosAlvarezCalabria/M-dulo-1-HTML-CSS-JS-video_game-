class Goku {
    constructor(ctx , x , y ){
        this.ctx = ctx;
        this.y   = y;
        this.x   = x;
        this.w   = 20;
        this.h   = 20;
    }

    draw(){
        this.ctx.fillRect(this.x , this.y , this.w, this.h)
    }
}
