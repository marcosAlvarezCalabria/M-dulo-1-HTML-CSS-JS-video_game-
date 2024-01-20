class Enemy1 {
     constructor (ctx , x , y){
        this.ctx = ctx;
        this.y   = y;
        this.x   = x;
        this.vX  = 0.5;
        this.w   = 10;
        this.h  = 10; 
    
        
    }
    
    move (){
        
        this.x -= this.vX 
       
    }
    clear () {
        this.ctx.clearRect(this.x , this.y , this.w, this.h)

    }
    
    
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