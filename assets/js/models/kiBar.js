class KiBar{
    constructor(ctx, x, y)  {
        this.ctx = ctx;
        this.x   = x;
        this.y   = y;
        this.w   = 0;
        this.initialW = this.w;
        this.h   = 20;
        

    }
    draw(){
        this.ctx.fillRect (this.x, this.y, this.w, this.h)
    }
    updateKiBar(){
        this.w += 5
       
            console.log (`kibar.w es ${this.w} `)

    }
}