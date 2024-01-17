class Game {
    constructor(canvasId){
        this.canvas = document.getElementById(canvasId)
        this.canvas.height = CANVAS_H
        this.canvas.width  =CANVAS_W

        this.ctx = this.canvas.getContext ("2d")
        this.fps = FPS

        this.drawIntervalId= undefined
        this.goku = new Goku (this.ctx , 0 , 160)
        
    }

    star(){
        if (!this.drawIntervalId){
            this.drawIntervalId = setInterval(()=>{
                this.clear()
                this.move()
                this.draw()
            
            },this.fps) 
        }
        
    }
    onKeyEvent(event){
        this.goku.onKeyEvent(event)
    }
    draw(){
        this.goku.draw();
       
        
    }
    move (){
        this.goku.move()
    }
    clear (){
        this.ctx.clearRect (0 , 0 , this.canvas.width , this.canvas.height)
    }
}