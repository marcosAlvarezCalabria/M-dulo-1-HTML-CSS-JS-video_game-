class Goku {
    constructor(ctx , x , y ){
        this.ctx = ctx;
        this.y   = y;
        this.x   = x;
        this.vX  = SPEED_MOVE;
        this.w   = 20;
        this.h   = 20;

//MOVEMENTS GOKU
        this.movements ={
            right : false,
            left  : false,
            jump  : false,
            punch : false
        }
    }
    onKeyEvent(event){
        const enabled = event.type === "keydown"

        switch (event.keyCode) {
            case KEY_RIGHT:

                this.movements.right = enabled;
                console.log ( "RIGHT")

                break;
            case KEY_LEFT:
                
                this.movements.left = enabled;
                
                break;
            case KEY_JUMP:
                if (enabled){
                    this.jump ()
                }
                

                break;
            case KEY_PUNCH:
                
                this.movements.punch = enabled
                break;
        
            
        }
    }



    move (){
        if (this.movements.right) {
            this.x += this.vX
            
        }else if (this.movements.left){
            this.x -= this.vX
        }
        
        
    }
    clear () {

    }

    draw(){
        this.ctx.fillRect(this.x , this.y , this.w, this.h)
    }
}
