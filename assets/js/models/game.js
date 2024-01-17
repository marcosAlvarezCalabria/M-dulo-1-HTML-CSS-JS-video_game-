class Game {
    constructor(canvasId){
        this.canvas = document.getElementById(canvasId)
        this.canvas.height = CANVAS_H
        this.canvas.width  =CANVAS_W

        this.ctx = this.canvas.getContext ("2d")
        this.fps = FPS

        this.drawIntervalId= undefined


        this.goku = new Goku (this.ctx , 0 , 160)
        this.enemy1= new Enemy1 (this.ctx ,200, 160 )
        this.enemies = []
        
    }

    star(){
        if (!this.drawIntervalId){
            this.drawIntervalId = setInterval(()=>{
                this.clear()
                this.move()
                this.draw()
                this.checkCollisions()
            
            },this.fps) 
        }
        
    }
    stop(){
        clearInterval(this.drawIntervalId)
        this.drawIntervalId = undefined
        console.log( "collision")
    }
    onKeyEvent(event){
        this.goku.onKeyEvent(event)
    }
    draw(){
        this.goku.draw();
        this.enemy1.draw();
       
        
    }
    move (){
        this.goku.move()
        this.enemy1.move()
    }
    clear (){
        this.ctx.clearRect (0 , 0 , this.canvas.width , this.canvas.height)
    }
    checkCollisions(){
        if ( this.enemy1.collision(this.goku)){
            this.stop()
        }
    }
}