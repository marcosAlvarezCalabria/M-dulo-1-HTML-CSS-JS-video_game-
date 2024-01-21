class Goku {
  constructor(ctx, x, y, kiBar, score, healthBar, singLives,ondaVital) {
    this.ctx = ctx;
    this.y = y;
    this.vY = SPEED_JUMP;
    this.x = x;
    this.vX = SPEED_MOVE;
    this.w = 20;
    this.h = 20;
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

    //MOVEMENTS GOKU
    this.movements = {
      right: false,
      left: false,
      jump: false,
      dobleJump: false,
      punch: false,
      
    };
  }
  onKeyEvent(event, enemies) {
    const enabled = event.type === "keydown";

    console.log(event.keyCode);

    switch (event.keyCode) {
      case KEY_RIGHT:
        this.movements.right = enabled;
        console.log("RIGHT");
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
          /////////prueba
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
        this.kiBar.updateKiBar();
        this.score.incrementPoints();

        
      }
    });
    
    this.w = prevW;
    //this.ctx.fillRect(this.x + this.w +5, this.y - Math.ceil(this.h/2), 20,20 )
  }

  specialHit() {

    if(this.kiBar.w === 5){
   this.ondasVital.push( new OndaVital (this.ctx , this.x + this.w ,this.y + Math.ceil(this.h/2)))
   console.log(this.ondasVital)

  }
  this.kiBar.w = 0
}

  live() {
    //
    if (!this.hasCollided) {
      this.hasCollided = true;
      this.health -= ENEMY_1_DAMAGE;
    }
    this.hasCollided = false;
  }
  decrementLives() {
    if (this.healthBar.w <= 0) {
      this.singLives.quantity--;
      this.healthBar.w = this.healthBar.initialW;
      console.log(LIVES_GOKU);
    }
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

  draw() {
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
    this.ondasVital.forEach((onda)=>onda.draw())
  }
}
