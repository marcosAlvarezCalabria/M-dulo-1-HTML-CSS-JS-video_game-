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

    
    this.healthBar = new HealthBar(this.ctx, 30, 10);

    this.singLives = new SingLives(this.ctx, 10, 28);
    this.score = new Score(this.ctx, 350, 28);
    this.kiBar = new KiBar(this.ctx, 5, 460);
    this.goku = new Goku(
      this.ctx,
      0,//x
      400,//y
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

    //////////bars /////////////////

    ///////////score//////////////////////
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
      this.enemies.push((this.enemy1 = new Enemy1(this.ctx, 500, 410)));
    }
  }
  stop() {
    clearInterval(this.drawIntervalId);
    this.drawIntervalId = undefined;
  }
  gameOver() {
    if (this.singLives.quantity === 0) {
      this.stop();
    }
  }
  onKeyEvent(event) {
    this.goku.onKeyEvent(event, this.enemies);
  }

  draw() {
    this.goku.draw();
    this.enemies.forEach((enemy) => enemy.draw());
    this.healthBar.draw();
    this.kiBar.draw();
    this.score.draw();
    this.singLives.draw();
   
  }
  move() {
    this.goku.move();
    this.enemies.forEach((enemy) => enemy.move());
   
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.enemies.forEach((enemy) => {
      //para borrar los enemigos si salen por la izquierda
      if (enemy.x === 0) {
        this.enemies.shift();
        console.log(this.enemies);
      }
      this.goku.clear();
    });
  }

  UpDateBarsAndLives() {
    this.healthBar.updateHealthBar();
    this.goku.decrementLives();
  }

  checkCollisions() {
    this.enemies.forEach((enemy, index) => {
      if (enemy.collision(this.goku)) {
        this.enemies.splice(index, 1);
        this.goku.live();
        this.UpDateBarsAndLives();
        
      }
    });
  }
  
}
