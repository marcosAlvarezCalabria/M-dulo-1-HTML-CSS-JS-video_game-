class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.height = CANVAS_H;
    this.canvas.width = CANVAS_W;

    this.ctx = this.canvas.getContext("2d");
    this.fps = FPS;

    this.drawIntervalId = undefined;
    this.moveEnemiesIntervalId = undefined;
    this.counterBallsCaught = 0;

    ////////////////////////new/////////////////////////////////////
    this.background = new Background(this.ctx);
    this.healthBar = new HealthBar(this.ctx, 30, 10);
    this.singLives = new SingLives(
      this.ctx,
      Math.ceil(this.healthBar.w / 5 + 5),
      this.healthBar.h
    );
    this.score = new Score(
      this.ctx,
      this.canvas.width - 50,
      this.canvas.height - this.canvas.height + 50
    );
    this.kiBar = new KiBar(
      this.ctx,
      this.canvas.width - (this.canvas.width - 45),
      this.canvas.height - 80
    );
    this.gameOverSing = new GameOverSing(
      this.ctx,
      450,
      Math.ceil(this.canvas.height / 2)
    );
    this.youWin = new SingYouWin(
      this.ctx,
      Math.ceil(this.canvas.width / 150),
      Math.ceil(this.canvas.height / 10)
    );
    this.clock = new Clock(
      this.ctx,
      this.canvas.width - 500,
      this.canvas.height - this.canvas.height + 50
    );
    this.gameOverSwitch = false;

    this.goku = new Goku(
      this.ctx,
      this.canvas.width - this.canvas.width, //x
      this.canvas.height - 150, //y
      this.kiBar,
      this.score,
      this.healthBar,
      this.singLives,
      this.dragonBall
    );

    ////////enemies/////////////////
    this.valueEnemies = 200;

    this.addEnemyTick = 0;

    this.enemies = [];
    ////////////////mode /////////////////////////////
    this.mode = {
      easy: false,
      normal: false,
      hard: false,
    };
    ///////////////BALLS/////////////////////////
    this.showBallTick = 0;
    this.randomInterval = undefined;

    this.dragonBall = new DragonBall(
      this.ctx,
      POSITION_X_BALL,
      POSITION_Y_BALL
    );

    this.counterDragonBalls = new CounterDragonBall(
      this.ctx,
      Math.ceil(this.canvas.width / 1.5),
      this.canvas.height - 50
    );
    ///////////////////////////////////////////////sounds///////////////////////////////////////////

    this.soundDieEnemy = new Audio();
    this.soundDieEnemy.src =
      "/assets/sounds/DBAA sounds and voices/diedEnemy.wav";
    this.soundShowBall = new Audio();
    this.soundShowBall.src = "/assets/sounds/DBAA sounds and voices/ball.wav";
    this.soundCaughtBall = new Audio();
    this.soundCaughtBall.src =
      "/assets/sounds/DBAA sounds and voices/caughtBall.wav";
    this.soundDiedGoku = new Audio();
    this.soundDiedGoku.src =
      "/assets/sounds/DBAA sounds and voices/gokuDied.wav";
    this.audio = new Audio();
    this.audio.src =
      "/assets/sounds/DBAA sounds and voices/Dragon_Ball_Opening_Audio_Latino_01_onlinevideoconverter.pro.mp3";
    this.audio.volume = 0.1;
  }

  startClock() {
    this.clock.startClock();
  }

  choseMode() {
    if (this.mode.easy) {
      this.valueEnemies = 200;
    } else if (this.mode.normal) {
      this.valueEnemies = 150;
    } else if (this.mode.hard) {
      this.valueEnemies = 100;
    }
  }
  incrementDificult() {
    if (this.mode.easy)
      switch (this.score.points) {
        case 2:
          this.valueEnemies = 175;
          console.log(`valieEnemies = ${this.valueEnemies}`);
          break;
        case 4:
          this.valueEnemies = 150;
          console.log(`valieEnemies = ${this.valueEnemies}`);
          break;
        case 6:
          this.valueEnemies = 125;
          console.log(`valieEnemies = ${this.valueEnemies}`);
          break;

        default:
          break;
      }
    if (this.mode.normal)
      switch (this.score.points) {
        case 2:
          this.valueEnemies = 125;
          console.log(`valieEnemies = ${this.valueEnemies}`);
          break;
        case 4:
          this.valueEnemies = 100;
          console.log(`valieEnemies = ${this.valueEnemies}`);
          break;
        case 6:
          this.valueEnemies = 75;
          console.log(`valieEnemies = ${this.valueEnemies}`);
          break;

        default:
          break;
      }
    if (this.mode.hard)
      switch (this.score.points) {
        case 2:
          this.valueEnemies = 90;
          console.log(`valieEnemies = ${this.valueEnemies}`);
          break;
        case 4:
          this.valueEnemies = 80;
          console.log(`valieEnemies = ${this.valueEnemies}`);
          break;
        case 6:
          this.valueEnemies = 60;
          console.log(`valieEnemies = ${this.valueEnemies}`);
          break;

        default:
          break;
      }
  }
  showBalls() {
    this.showBallTick++;

    if (this.showBallTick > 500) {
      if (
        !this.randomInterval &&
        !this.gameOverSwitch &&
        this.counterBallsCaught < 7
      ) {
        // Establecer intervalo para cambiar aleatoriamente cada 20 segundos
        this.randomInterval = setInterval(() => {
          this.dragonBall.x = Math.ceil(Math.random() * 1200);
          this.dragonBall.y = Math.ceil(Math.random() * 500) + 100;
          if (this.counterBallsCaught === 0) {
            this.soundShowBall.play();
          }
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

        this.showBalls();
        this.audio.play();
        this.audio.volume = 0.1;
      }, this.fps);
    }
  }
  addEnemy(value) {
    this.incrementDificult();

    this.addEnemyTick++;
    if (this.addEnemyTick > value) {
      this.addEnemyTick = 5;
      let randomenemy = Math.floor(Math.random() * 2);
      if (randomenemy === 1) {
        this.enemies.push(
          new Enemy1(
            this.ctx,
            this.canvas.width,
            Math.ceil(Math.random() * 500),
            ENEMY_BIRD
          )
        );
        console.log(this.randomNum1);
      } else {
        this.enemies.push(
          new Enemy1(
            this.ctx,
            this.canvas.width,
            this.canvas.height - 160,
            ENEMY_PIG
          )
        );
      }
    }
  }
  stop() {
    this.audio.volume = 0.1;
    clearInterval(this.drawIntervalId);
    this.drawIntervalId = undefined;
    this.enemies = []; //para que no salgan los enemigos en la pantalla gameOver
    //clearInterval(this.randomInterval);
    this.youWin.showtime(this.clock.formattedTime);

    clearInterval(this.randomInterval);

    clearInterval(this.randomInterval);
    this.randomInterval = undefined;
  }

  gameOver() {
    if (this.singLives.quantity === 0) {
      this.healthBar.sprite.src = "/assets/img/spgoku/sprite-live-4.png";
      this.stop();
      this.clock.stopClock();
      this.gameOverSwitch = true;
    }
  }
  //////////////////////////////////////////////////////counterCaughBALL EN 7///////////////////////////////
  youWon() {
    if (this.counterBallsCaught === 7) {
      this.goku.x = 5000;
      this.clock.stopClock();
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
    this.dragonBall.draw();
    this.clock.draw();
    this.counterDragonBalls.draw();

    ///////////////////////////////////////you win en 7 ////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    if (this.counterBallsCaught === 7) {
      this.youWin.draw();
    }

    if (this.singLives.quantity === 0) {
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
      if (enemy.x > enemy.x * 2) {
        this.enemies.shift();
      }
      this.goku.clear();
    });
  }
  updateLives() {
    if (this.healthBar.quantityLive === 2) {
      this.singLives.quantity--;
    }
  }
  upDateHealthBar() {
    this.healthBar.updateHealthBar();
  }

  checkCollisions() {
    this.enemies.forEach((enemy, index) => {
      if (enemy.collision(this.goku)) {
        this.enemies.splice(index, 1);
        this.updateLives();

        this.healthBar.quantityLive--;
        this.soundDiedGoku.play();

        this.upDateHealthBar();
      }
      this.goku.ondasVital.filter((onda) => {
        for (let i = 0; i < this.enemies.length; i++) {
          const enemy = this.enemies[i];
          if (enemy.collision(onda)) {
            this.enemies.splice(i, 1);
            this.score.points++;
            this.soundDieEnemy.play();
          }
        }
      });
    });
    if (this.dragonBall.collision(this.goku)) {
      this.showBallTick = 0;
      this.soundCaughtBall.play();

      this.counterBallsCaught++;
      this.youWon();
      this.dragonBall.x = POSITION_X_BALL;

      this.dragonBall.y = POSITION_Y_BALL;

      this.counterDragonBalls.updateCounter(this.counterBallsCaught);
    }
  }
}
