class Goku {
  constructor(ctx, x, y, kiBar, score, healthBar, singLives,cloud) {
    this.ctx = ctx;
    this.y = y;
    this.vY = SPEED_JUMP;
    this.x = x;
    this.vX = SPEED_MOVE_GOKU;
    this.w =57 *2;
    this.h = 43 *2;
    this.y0 = y;
    this.yMax = 260;
    this.health = HEALTH_GOKU;
    
   
    this.hasCollided = false;
    this.kiBar = kiBar;
    this.score = score;
    this.healthBar = healthBar;
    this.lives = LIVES_GOKU;
    this.singLives = singLives;
    this.ondasVital = []
    this.clouds = []
    this.initialSprite = {}


    this.sprite = new Image();
    this.sprite.src = "/assets/img/spgoku/goku-kid.png";
    this.sprite.verticalFrames = 1;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizontalFrames = 8;
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameWidth = Math.ceil(this.sprite.width / this.sprite.horizontalFrames);
      this.sprite.frameHeight = Math.ceil(this.sprite.height / this.sprite.verticalFrames);
    }
    this.animationTick = 0


    //MOVEMENTS GOKU
    this.movements = {
      callCloud:false,
      walk : false,
      stop : false,
      right: false,
      left: false,
      jump: false,
      dobleJump: false,
      punch: false,
      
    };
    this.isRidingCloud ={
      isFliying :false,
      up : false,
      down : false,
      left : false,
      right : false
    }
  }
  onKeyEvent(event, enemies) {
    const enabled = event.type === "keydown";
    console.log(`${event.keyCode}`)

    switch (event.keyCode) {

      case KEY_RIGHT:
        this.movements.right = enabled;
        this.isRidingCloud.right = true
        
        break;

      case KEY_LEFT:
        this.movements.left = enabled;
        this.isRidingCloud.left = true
        break;

      case KEY_JUMP:
        if (enabled) {
          this.jump();
        } else {
          this.vY = SPEED_JUMP;
          this.toRideCloud();
        }
        break;
        case KEY_DOWN:{
          this.isRidingCloud.down = true
          console.log("ABAJO")
          this.moveFliying();
        }
        break;
        case KEY_UP:{
          this.isRidingCloud.up = true
          console.log("ARRIBA")
          this.moveFliying()

        }
        break;


      case KEY_PUNCH:
        if (enabled) {
          this.movements.punch = true
          this.punch(enemies);
          this.animatePunch();
         
          
        }else{
          this.initialState()
       }
        break;
      case KEY_SPECIAL_HIT:
        if (enabled) {
            this.specialHit()
            
        }  
        break;
      case KEY_CALL_CLOUD :
        if (enabled){
          this.callingCloud()
          
          
          
          
        }
        
         
          
        
         
    }
  }
  ///////////////PUNCH////////////////////////////
  punch(enemies) {
    const prevW = this.w;
    this.w = 130;
    enemies.forEach((enemy, index) => {
      if (enemy.collision(this)) {
        enemies.splice(index, 1);
        this.kiBar.updateQuantityki();
        this.score.points ++
      
      }
    });
    
    this.w = prevW;
    //this.ctx.fillRect(this.x + this.w +5, this.y - Math.ceil(this.h/2), 20,20 )
  }
  ///////////////////SPCECIALHIT/////////////////////////////////

  specialHit() {

    if(this.kiBar.quantityKi === 3){
   this.ondasVital.push( new OndaVital (this.ctx , this.x + this.w ,this.y + Math.ceil(this.h/2)))
   

  }
  this.kiBar.quantityKi = 0
}
///////////////////////////////CLOUD/////////////////////////////////////
callingCloud(){
  
 this.clouds.push ( new Cloud (this.ctx , CANVAS_W ,CANVAS_H- 300))  

}
toRideCloud(){
  
this.clouds.forEach((cloud)=>{
  if (this.x > cloud.x && this.y < cloud.y){
    this.y0 = cloud.y -50
    console.log("encima de la nube")
    this.isRidingCloud.isFliying = true 
   
  }
})

}

moveFliying(){
  if (this.isRidingCloud.isFliying) {
    console.log(`mi y0 es ${this.y0} y mi x es ${this.x}`)
    console.log(`ISRINDG.RIGHT ES  ${this.isRidingCloud.right}`)

    if(this.isRidingCloud.right){
      this.x += this.vX
      console.log(`A LA DCHA ES ${this.isRidingCloud.right}`)
    }
    if (this.isRidingCloud.left){
      this.x -= this.vX
      console.log(`A LA IZQUIERDA ES ${this.isRidingCloud.left}`)
      console.log("volando izq")
    }
    if (this.isRidingCloud.up){
      this.y -= this.vY
      console.log("volando arriba")
    }
     if ( this.isRidingCloud.down){
      this.y += this.vY
      console.log("volando abajo")
    }

    

    
  }

}


  

  jump() {
    this.vY = -SPEED_JUMP;
    
  }
 

  move() {
    this.ondasVital.forEach((onda) => onda.move())
    this.clouds.forEach((cloud)=>cloud.move(this.x,this.y,this.movements.right,this.movements.left,this.movements.walk,this.vX,this.y0))
   
   
    

    if (!this.movements.right &&
        !this.movements.left &&
        !this.movements.jump  ){
          this.movements.walk = true
          this.x += (this.vX - 9);
        }//else {
          //this.movements.walk = false
       // }

    

    if (this.movements.right) {
      this.x += this.vX;
    } else if (this.movements.left) {
      this.x -= this.vX;
    }
    //////// MOVE JUMP/////////

    this.y += this.vY;

    if (this.y > this.y0) {
    
      this.y = this.y0;
      this.movements.jump = false;
    }
  }

  clear() {
    this.ctx.clearRect(this.x, this.y, this.w, this.h);

    
        this.ondasVital= this.ondasVital.filter((onda)=> onda.x < this.ctx.canvas.width )
        this.ondasVital= this.ondasVital.filter((onda)=> onda.y < this.ctx.canvas.height)
        this.ondasVital= this.ondasVital.filter((onda)=> onda.y > 0)
        this.ondasVital= this.ondasVital.filter((onda)=> onda.x > 0)

     
                    
  }
  animate() {
    this.animationTick++;
 
     if (this.animationTick >= 7 && (this.movements.right || this.movements.left||this.movements.walk)) {
      this.animationTick = 0;
      this.sprite.horizontalFrameIndex++;

      if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
        this.sprite.horizontalFrameIndex = 1;
      }
    }
    
  }
  animatePunch(){
    if (this.movements.punch){
      
      console.log (this.movements.punch)

      this.sprite.src = "/assets/img/spgoku/punch1.png"
      this.sprite.verticalFrames = 1;
      this.sprite.verticalFrameIndex = 0;
      this.sprite.horizontalFrames = 2;
      this.sprite.horizontalFrameIndex = 0;
      this.sprite.horizontalFrameIndex++
      //this.x += this.vX
      
      
      

    }
    this.movements.punch = false
    
  }
 initialState(){
    this.sprite.src = "/assets/img/spgoku/goku-kid.png";
    this.sprite.verticalFrames = 1;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizontalFrames = 8
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameWidth = Math.ceil(this.sprite.width / this.sprite.horizontalFrames);
      this.sprite.frameHeight = Math.ceil(this.sprite.height / this.sprite.verticalFrames);
    }
  }
  collision(element){
    return   (this.x + this.w > element.x &&
             this.x < element.x + element.w &&
             this.y + this.h > element.y &&
             this.y < element.y + element.h
             )
 
 }


  draw() {
    
    if (this.sprite.isReady) {
      this.ctx.drawImage(
        this.sprite,
        this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
        this.sprite.verticalFrameIndex * this.sprite.frameHeight,
        this.sprite.frameWidth,
        this.sprite.frameHeight,
        this.x,
        this.y,
        this.w,
        this.h
      )
      this.animate();
    }
    this.ondasVital.forEach((onda)=>onda.draw())
    this.clouds.forEach((cloud)=>cloud.draw())

  }
}
