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
    this.singLives = new SingLives(this.ctx, this.healthBar.w /4,this.healthBar.h);
    this.score     = new Score(this.ctx, this.canvas.width-50, this.canvas.height - this.canvas.height+50);
    this.kiBar     = new KiBar(this.ctx, this.canvas.width - (this.canvas.width - 50 ), this.canvas.height - 80 );


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

    this.addEnemyTick = 0;
    this.enemies = [];

    

    
  }

  start() {
    if (!this.drawIntervalId) {
      this.drawIntervalId = setInterval(() => {
        this.clear();
        this.addEnemy();
        this.move();
        this.gameOver();
        this.draw();
        this.checkCollisions();
        
      }, this.fps);
    }
  }
  addEnemy() {
    this.addEnemyTick++;
    if (this.addEnemyTick > 200) {
      this.addEnemyTick = 0;
      this.enemies.push((this.enemy1 = new Enemy1(this.ctx, this.canvas.width, this.canvas.height -160)));
    }
  }
  stop() {
    clearInterval(this.drawIntervalId);
    this.drawIntervalId = undefined;
  }
  gameOver() {
    if (this.singLives.quantity === 0 ) {
      this.stop();
      this.healthBar.sprite.src =  "/assets/img/spgoku/sprite-live-4.png"//para que no se quede la healthBar a medias al hacer gameOver
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
  
}
