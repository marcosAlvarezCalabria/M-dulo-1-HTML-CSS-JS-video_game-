class HealthBar {
    constructor(ctx,x,y){
        this.ctx = ctx;
        this.y   = y;
        this.x   = x;
        this.w   =WIDTH_BAR;
        this.initialW = this.w;
        this.h   = HEIGHT_BAR;
    }

    draw(){
        this.ctx.fillRect(this.x, this.y, this.w, this.h)
    }

    updateHealthBar(){
        this.w -= ENEMY_1_DAMAGE*50
        if (this.w <= 0){
            this.w = 0
        }

        
    }
    


}