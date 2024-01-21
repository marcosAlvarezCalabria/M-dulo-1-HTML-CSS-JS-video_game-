class Background {
    constructor (ctx ) {
        this.ctx = ctx;
        this.x  = 0;
        this.initialX= this.x
        this.vX = SPEED_BACKGROUND;
        this.y = 0;
        this.w  = this.ctx.canvas.width;
        this.h = this.ctx.canvas.height;

        this.sprite = new Image();//esto es el tag img del html
        this.sprite.src ="/assets/img/background/bg1.png";
       
        this.sprite.onload = () => {
            this.sprite.isReady = true;
        } 
    }
    move(){
        this.x -= this.vX
        if ( this.x < -this.w){//no entiendo muy bien por que pero es asi 
            this.x = 0

        }

        

    }
    draw(){ 
        if (this.sprite.isReady){//si la imagen esta cargada empieza a pintar

            this.ctx.drawImage(
                this.sprite,//la imagen a pintar 
                this.x,// donde empieza a pintar dentro del canvas
                this.y,//desde donde de alto 
                this.w,//el ancho 
                this.h//el alto 
            )
            this.ctx.drawImage(
                this.sprite,//la imagen a pintar 
                this.x + this.w,// donde empieza a pintar dentro del canvas
                this.y,//desde donde de alto 
                this.w,//el ancho 
                this.h//el alto 

            )
        }
    }
}