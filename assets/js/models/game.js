class Game {
    constructor(canvasId){
        this.canvas = document.getElementById(canvasId)
        this.canvas.height = CANVAS_H
        this.canvas.width  =CANVAS_W

        this.ctx = this.canvas.getContext ("2d")
        this.fps = FPS

        this.drawIntervalId= undefined
        this.goku = new Goku (this.ctx , 60 , 60)
    }

    star(){
        if (!this.drawIntervalId){
            this.drawIntervalId = setInterval(()=>{
                this.draw()
            },this.fps) 
        }
        
    }
    draw(){
        this.goku.draw();
        
    }
}