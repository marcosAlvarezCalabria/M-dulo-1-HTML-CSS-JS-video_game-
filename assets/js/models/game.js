class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.height = CANVAS_H;
    this.canvas.width = CANVAS_W;

    this.ctx = this.canvas.getContext("2d");
    this.fps = FPS;

    this.drawIntervalId = undefined;
    this.moveEnemiesIntervalId = undefined;
    

////////////////////////new/////////////////////////////////////
    this.background = new Background(this.ctx)
    this.healthBar = new HealthBar(this.ctx, 30, 10);
    this.singLives = new SingLives(this.ctx, Math.ceil (this.healthBar.w /5+5),this.healthBar.h);
    this.score = new Score(this.ctx, this.canvas.width-50, this.canvas.height - this.canvas.height+50);
    this.kiBar = new KiBar(this.ctx, this.canvas.width - (this.canvas.width - 45 ), this.canvas.height - 80 );
    this.gameOverSing = new GameOverSing (this.ctx ,Math.ceil(this.canvas.width/2), Math.ceil(this.canvas.height/2))
   
    this.gameOverSwitch= false
   
   


    this.goku = new Goku(
      this.ctx,
      this.canvas.width - this.canvas.width ,//x
      this.canvas.height - 150,//y
      this.kiBar,
      this.score,
      this.healthBar,
      this.singLives,
      this.dragonBall
     
      
      
    );

   
    

    ////////enemies/////////////////
    this.valueEnemies = 200
     
    this.addEnemyTick = 0;
    
    this.enemies = [];
////////////////mode /////////////////////////////
    this.mode = {
      easy:false,
      normal:false,
      hard : false
    }
    ///////////////BALLS/////////////////////////
    this.showBallTick = 0
    this.counterBallsCaught = 0 
    
    this.dragonBall = new DragonBall (this.ctx, POSITION_X_BALL,POSITION_Y_BALL)

    this.counterDragonBalls = new CounterDragonBall ( this.ctx, Math.ceil (this.canvas.width/1.5),this.canvas.height -50)
    this.randomNum1= 0
    this.randomNum2=0

  
     
     
  }
  numeroRandom(){
    this.randomNum1 = Math.floor(Math.random() * 500);
  }
    


  
  choseMode(){
    if ( this.mode.easy){
      this.valueEnemies = 200
    }else if ( this.mode.normal){
      this.valueEnemies = 150
    }else if ( this.mode.hard){
      this.valueEnemies = 100
    }
  }

  showBalls() {
    this.showBallTick++;

    if (this.showBallTick > 100) {
        if (!this.randomInterval) {
            // Establecer intervalo para cambiar aleatoriamente cada 20 segundos
            this.randomInterval = setInterval(() => {
                this.dragonBall.x = Math.ceil(Math.random() * 1000);
                this.dragonBall.y = Math.ceil(Math.random() * 1000);
                console.log(this.dragonBall.x, this.dragonBall.y);
            }, 10000);
        }
    } else {
        // Reiniciar el intervalo cuando no se cumple la condición
        clearInterval(this.randomInterval);
        this.randomInterval = null;
    }
}


  start() {
    if (!this.drawIntervalId) {
      this.drawIntervalId = setInterval(() => {
        this.clear();
        this.addEnemy(this.valueEnemies);
        this.move();
        this.gameOver();
        this.draw();
        this.checkCollisions();
        this.gameOverSwitch= false
        this.showBalls();

       
        
        
      }, this.fps);
    }
  }
  addEnemy(value) {
   
    this.addEnemyTick++;
    if (this.addEnemyTick > value) {
      this.addEnemyTick = 5;
      let randomenemy = Math.floor(Math.random () * 2);console.log(randomenemy)
      if(randomenemy === 1 ) {
        this.enemies.push(( new Enemy1(this.ctx, this.canvas.width, this.canvas.height -360,ENEMY_BIRD)));
        console.log(this.randomNum1)

      }else {
        this.enemies.push(( new Enemy1 (this.ctx, this.canvas.width, this.canvas.height -160,ENEMY_PIG)));

      }

      
      
    }
  }
  stop() {
    clearInterval(this.drawIntervalId);
    this.drawIntervalId = undefined;
    this.enemies = []//para que no salgan los enemigos en la pantalla gameOver
  }
 
  gameOver() {
    if (this.singLives.quantity === 2 ) {
      this.healthBar.sprite.src = "/assets/img/spgoku/sprite-live-4.png"
      this.stop();
      this.gameOverSwitch = true
      

    
      
    }
  }
  onKeyEvent(event) {
    this.goku.onKeyEvent(event, this.enemies);
    
  }

  draw() {
    this.background.draw();
    this.goku.draw();
    this.enemies.forEach((enemy) => enemy.draw());
    this.healthBar.draw();
    this.kiBar.draw();
    this.score.draw();
    this.singLives.draw();
    this.dragonBall.draw()
   
    this.counterDragonBalls.draw()
   
    

    if (this.singLives.quantity === 2){
      this.gameOverSing.draw();
    }
   
    
   
  }
  move() {
    this.background.move();
    this.goku.move();
    this.enemies.forEach((enemy) => enemy.move());
   
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.enemies.forEach((enemy) => {
      //para borrar los enemigos si salen por la izquierda
      if (enemy.x > (enemy.x *2)) {
        this.enemies.shift();
                
      }
      this.goku.clear();
    });
  
   
  }
  updateLives(){
    if (this.healthBar.quantityLive === 2) {
      this.singLives.quantity --
      
    }

  }
  upDateHealthBar(){
    this.healthBar.updateHealthBar();
   
   
  }
  
    
  

  checkCollisions() {
    this.enemies.forEach((enemy, index) => {
      if (enemy.collision(this.goku)) {
        this.enemies.splice(index, 1);
        this.updateLives();

        this.healthBar.quantityLive --
        

        this.upDateHealthBar();
        
       
        
      }
       this.goku.ondasVital.filter((onda)=>{

        for (let i = 0; i < this.enemies.length; i++) {
            const enemy = this.enemies[i];
            if ( enemy.collision (onda)){
                this.enemies.splice(i,1)
                this.score.points++

                console.log(this.enemies)
                
            }
            
        }

       })
    });
    if (this.dragonBall.collision(this.goku)){
      this.showBallTick = 0

      this.counterBallsCaught ++ 
      this.dragonBall.x = POSITION_X_BALL

      this.dragonBall.y = POSITION_Y_BALL

      this.counterDragonBalls.updateCounter(this.counterBallsCaught)

console.log(`este es el contador de bolas ${this.counterBallsCaught} `)

    }
    
  }
 
 
  
}
