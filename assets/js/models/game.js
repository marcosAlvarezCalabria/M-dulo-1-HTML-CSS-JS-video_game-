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
    this.gameOverSing = new GameOverSing (this.ctx ,Math.ceil(this.canvas.width/2), Math.ceil(this.canvas.height/2) )
    this.cloud = new Cloud(this.ctx , 30,30) 


    this.goku = new Goku(
      this.ctx,
      this.canvas.width - this.canvas.width ,//x
      this.canvas.height - 150,//y
      this.kiBar,
      this.score,
      this.healthBar,
      this.singLives,
      this.ondasVital
    );

    this.ondasVital=[]

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

  start() {
    if (!this.drawIntervalId) {
      this.drawIntervalId = setInterval(() => {
        this.clear();
        this.addEnemy(this.valueEnemies);
        this.move();
        this.gameOver();
        this.draw();
        this.checkCollisions();
        
        
      }, this.fps);
    }
  }
  addEnemy(value) {
   
    this.addEnemyTick++;
    if (this.addEnemyTick > value) {
      this.addEnemyTick = 5;
      this.enemies.push((this.enemy1 = new Enemy1(this.ctx, this.canvas.width, this.canvas.height -160)));
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
    this.cloud.draw();

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
      if (enemy.x === 0) {
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
                this.enemies.splice(index,1)
                this.score.points++
                
            }
            
        }

       })
    });
    
  }
  ////////////////////////////////////////////////////////////////
  /*mousePosition(){
    this.canvas.getBoundingClientRect()
    
  }*/
  
}
