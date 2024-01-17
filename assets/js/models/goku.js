class Goku {
    constructor(ctx , x , y ){
        this.ctx = ctx;
        this.y   = y;
        this.vY  = SPEED_JUMP
        this.x   = x;
        this.vX  = SPEED_MOVE;
        this.w   = 20;
        this.h   = 20;
        this.y0  = y;
        this.knuckles= undefined
       

//MOVEMENTS GOKU
        this.movements ={
            right : false,
            left  : false,
            jump  : false,
            punch : false
        }

////////////////KNUCKLES///////////////
        this.knuckles = {
            positionX : this.x + this.w +5,
            postitionY: this.y - Math.ceil(this.h/2),
            speedPunch: 1000
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
                if (enabled){
                    this.punch()
                    console.log("punch")
                }
                break;
        
            
        }
    }
    punch(){
        this.knuckles = true
        this.ctx.fillRect(this.x + this.w +5, this.y - Math.ceil(this.h/2), 10,10 )
        
        
        console.log(typeof this.knuckles)

    }

   
    jump(){
        if (!this.movements.jump){
            this.movements.jump = true

            this.y -= Math.ceil(this.h/2)
            this.vY = -SPEED_JUMP
            

        }

    }
    move (){
       
        if (this.movements.right) {
            this.x += this.vX
            
        }else if (this.movements.left){
            this.x -= this.vX
        }
        //////// MOVE JUMP/////////
        if (this.y < this.y0){
            this.vY += ACELERATION
            this.y += this.vY 
            
            
        }else {
            this.y = this.y0
            this.movements.jump = false
            
        }
        ///////////////PUNCH////////////////////

       

    }
    clear () {

    }

    draw(){
        this.ctx.fillRect(this.x , this.y , this.w, this.h)
       
       
    }
}
