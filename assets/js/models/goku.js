class Goku {
  constructor(ctx, x, y, kiBar, score, healthBar, singLives,ondaVital) {
    this.ctx = ctx;
    this.y = y;
    this.vY = SPEED_JUMP;
    this.x = x;
    this.vX = SPEED_MOVE;
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
      stop : false,
      right: false,
      left: false,
      jump: false,
      dobleJump: false,
      punch: false,
      
    };
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

      case KEY_UP:
        if (enabled) {
          this.jump();
        } else {
          this.vY = SPEED_JUMP;
        }
        break;

      case KEY_PUNCH:
        if (enabled) {
          this.punch(enemies);
          console.log("punch");
          
          
        }
        break;
      case KEY_SPECIAL_HIT:
        if (enabled) {
            this.specialHit()
            console.log("specialHit")
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
  

  specialHit() {

    if(this.kiBar.quantityKi === 3){
   this.ondasVital.push( new OndaVital (this.ctx , this.x + this.w ,this.y + Math.ceil(this.h/2)))
   

  }
  this.kiBar.quantityKi = 0
}



  

  jump() {
    this.vY = -SPEED_JUMP;
    this.vY += ACELERATION;
  }
 

  move() {
    this.ondasVital.forEach((onda)=>onda.move())

    if (this.movements.right) {
      this.x += this.vX;
    } else if (this.movements.left) {
      this.x -= this.vX;
    }
    //////// MOVE JUMP/////////

    this.y += this.vY;

    if (this.y < this.y0) {
    } else {
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

    if (this.movements.isJumping) {
      this.sprite.horizontalFrameIndex = 0;
    } else if (this.animationTick >= 10 && (this.movements.right || this.movements.left)) {
      this.animationTick = 0;
      this.sprite.horizontalFrameIndex++;

      if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
        this.sprite.horizontalFrameIndex = 1;
      }
    } else if (!this.movements.right && !this.movements.left) {
      this.sprite.horizontalFrameIndex = 0;
    }
    if (this.movements.punch){
      console.log("this")
      this.animationTick++;
      this.sprite.src = "/assets/img/spgoku/punch1.png"
      this.sprite.horizontalFrames = 2;
      this.horizontalFrameIndex = 0;
      this.sprite.verticalFrames = 1;
      this.sprite.verticalFrameIndex = 0;
      if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
        this.sprite.horizontalFrameIndex = 1;
      }

    }
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

  }
}
