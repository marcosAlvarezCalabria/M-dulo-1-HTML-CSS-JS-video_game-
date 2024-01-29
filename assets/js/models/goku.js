class Goku {
  constructor(ctx, x, y, kiBar, score, healthBar, singLives,dragonBall) {
    this.ctx = ctx;
    this.y = y;
    this.vY = SPEED_JUMP;
    this.x = x;
    this.vX = SPEED_MOVE_GOKU;
    this.w =57 *2;
    this.h = 43 *2;
    this.initialY0 = GOKU_FLOOR
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
    this.dragonBall = dragonBall


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
     

    }
  }
  onKeyEvent(event, enemies) {
    const enabled = event.type === "keydown";
   

    switch (event.keyCode) {

      case KEY_RIGHT:
        this.movements.right = enabled;
     
       
        
        break;

      case KEY_LEFT:
        this.movements.left = enabled;
      
        
        break;

      case KEY_JUMP:
        if (enabled) {
          this.jump();
        } else {
          this.vY = SPEED_JUMP;
          this.toRideCloud();
        }
        break;
        case KEY_DOWN:
          this.movements.down = enabled
          
          
          
          
        
        break;
        case KEY_UP:
          this.movements.up = enabled
        
         
         
        
        break;


      case KEY_PUNCH:
        if (enabled) {
          console.log(enemies)
          this.movements.punch = true
          this.punch(enemies);
          this.animatePunch();
        } else {
          this.initialState()
       }
        break;
      case KEY_SPECIAL_HIT:
        if (enabled) {
          this.specialHit()
          
        }  
        break;
      case KEY_CALL_CLOUD :
        if (enabled && !this.isRidingCloud.isFliying) {
          this.callingCloud()
         
        } else if ( enabled && this.isRidingCloud.isFliying) {
         
          this.getOffTheCloud()
        }
        break
         
          
        
         
    }
  }
  ///////////////PUNCH////////////////////////////
  punch(enemies) {
    const prevW = this.w;
    this.w = 150;
    
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

    if(this.kiBar.quantityKi >= 0){
   this.ondasVital.push( new OndaVital (this.ctx , this.x + this.w ,this.y ))//////////aqui
   

  }
  this.kiBar.quantityKi = 0
}
///////////////////////////////CLOUD/////////////////////////////////////
callingCloud(){
  if (this.clouds.length < 1){
    this.clouds.push(new Cloud(this.ctx , CANVAS_W ,CANVAS_H- 300))  
    this.isRidingCloud.leave = false
   
  }
  
}

toRideCloud(){
  this.clouds.forEach((cloud) => {
    if (this.x > cloud.x && this.y < cloud.y){
      
     
      this.isRidingCloud.isFliying = true 
    ;
    }
  })

}


getOffTheCloud(){
 
  this.isRidingCloud.isFliying=false
  this.isRidingCloud.leave = true
 
  
}
////////////////////////////////jump//////////////////////////////////////


  

  jump() {
    this.vY = -SPEED_JUMP;
    
  }
 

  move() {
   
    this.ondasVital.forEach((onda) => onda.move())
    this.clouds.forEach((cloud) => cloud.move(this.x -5,this.y,this.vX,this.isRidingCloud.isFliying,this.isRidingCloud.leave))
   
   
    

    if (!this.movements.right &&
        !this.movements.left &&
        !this.movements.jump  ){
          this.movements.walk = true
          this.x += (this.vX - 9);
        }

    

    if (this.movements.right) {
      this.x += this.vX;
    } else if (this.movements.left) {
      this.x -= this.vX;
    }
////////////////////////////////
    if (this.movements.up){
      this.y -= this.vY
    }
    if (this.movements.down){
      this.y += this.vY
    }
    //////// MOVE JUMP/////////

    if (!this.isRidingCloud.isFliying) {
      this.y += this.vY;
    }


    if (this.y > this.y0) {
    
      this.y = this.y0;
      this.movements.jump = false;
    }
   
  }
  ///////////////////////////caugh Balls/////////////////////////////

  

  clear() {
    this.ctx.clearRect(this.x, this.y, this.w, this.h);

    
        this.ondasVital= this.ondasVital.filter((onda)=> onda.x < this.ctx.canvas.width )
        this.ondasVital= this.ondasVital.filter((onda)=> onda.y < this.ctx.canvas.height)
        this.ondasVital= this.ondasVital.filter((onda)=> onda.y > 0)
        this.ondasVital= this.ondasVital.filter((onda)=> onda.x > 0)

        //this.clouds = this.clouds.filter((cloud) => cloud.x < this.ctx.canvas.width)
        this.clouds = this.clouds.filter((cloud) => cloud.y < this.ctx.canvas.width)
        this.clouds = this.clouds.filter((cloud) => cloud.y > 0);
        this.clouds = this.clouds.filter((cloud) => cloud.x > 0); 

     
                   
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

    }
    this.movements.punch = false
    
  }
  /*animateFly(){
    if (this.isRidingCloud.isFliying){
      this.sprite.src = "/assets/img/spgoku/cloud.png";
    this.sprite.verticalFrames = 1;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizontalFrames = 2
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameWidth = Math.ceil(this.sprite.width / this.sprite.horizontalFrames);
      this.sprite.frameHeight = Math.ceil(this.sprite.height / this.sprite.verticalFrames);
    }

      
    }
  }*/
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
