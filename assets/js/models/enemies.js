class Enemy1 {
     constructor (ctx , x , y){
        this.ctx = ctx;
        this.y   = y;
        this.x   = x;
        this.w   = 30;
        this.h  = 30; 
    }




    move (){}
    collision(element){
       return   (this.x + this.w > element.x &&
                this.x < element.x + element.w &&
                this.y + this.h > element.y &&
                this.y < element.y + element.h
                )
    
    }

     draw (){
        this.ctx.fillRect(this.x ,this.y , this.w , this.h)
     }
}