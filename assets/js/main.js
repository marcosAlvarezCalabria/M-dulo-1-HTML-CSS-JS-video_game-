window.addEventListener("load", () => {
  const game = new Game("main-canvas");

  //game.start()

  document.addEventListener("keydown", (event) => game.onKeyEvent(event));
  document.addEventListener("keyup", (event) => game.onKeyEvent(event));

  const playButton = document.getElementById(`btn-play`);

  playButton.addEventListener("click", () => {
    const choose = document.getElementById(`choose`);
    choose.classList.remove(`hidden`);
    if (modeActive) {
      game.startClock();
      game.start();
      const windowStart = document.getElementById("star-panel");
      const canvasWindow = document.getElementById("main-canvas");
      this.soundButtonPlay = new Audio();
      this.soundButtonPlay.src =
        "/assets/sounds/DBAA sounds and voices/play.wav";
      this.soundButtonPlay.play();
      this.soundButtonPlay.volume = 0.1;

      windowStart.classList.add(`hidden`);
      canvasWindow.classList.remove(`hidden`);
    }
    const gameOverButton = document.getElementById(`panel-game`);
    console.log(game.gameOverSwitch);
  });

  const startGameButton = document.getElementById(`btn-start-game`);
  /* startGameButton.addEventListener("click",()=>{
    game.start()
    const windowStart = document.getElementById("star-panel") 
    const canvasWindow = document.getElementById ("main-canvas")

    windowStart.classList.add(`hiden`)
    canvasWindow.classList.remove(`hiden`)
   
     
    })*/
  //const buttoncontinue = document.getElementById ("main-canvas")
  // buttoncontinue.addEventListener ("click",)

  ///////////////////butons menu/////////////////////////////
  let modeActive = false;
  const easyButton = document.getElementById(`btn-easy`);
  const hardButton = document.getElementById(`btn-hard`);
  const normalButton = document.getElementById(`btn-normal`);
  this.soundButton = new Audio();
  this.soundButton.src = "/assets/sounds/DBAA sounds and voices/buton.wav";

  easyButton.addEventListener("click", () => {
    this.soundButton.play();
    this.soundButton.volume = 0.1;
    modeActive = true;
    game.mode.easy = true;
    game.choseMode();
    hardButton.classList.remove(`chose-one`);
    normalButton.classList.remove(`chose-one`);
    easyButton.classList.add(`chose-one`);
    choose.classList.add(`hidden`);
  });
  normalButton.addEventListener("click", () => {
    this.soundButton.play();
    this.soundButton.volume = 0.1;
    modeActive = true;
    game.mode.normal = true;
    game.choseMode();
    easyButton.classList.remove(`chose-one`);
    hardButton.classList.remove(`chose-one`);
    normalButton.classList.add(`chose-one`);
    choose.classList.add(`hidden`);
  });

  hardButton.addEventListener("click", () => {
    this.soundButton.play();
    this.soundButton.volume = 0.1;
    modeActive = true;
    game.mode.hard = true;
    game.choseMode();
    easyButton.classList.remove(`chose-one`);
    normalButton.classList.remove(`chose-one`);
    hardButton.classList.add(`chose-one`);
    choose.classList.add(`hidden`);
  });

  /////////////////////button-continue//////////////////////

  /*easyButton.addEventListener("mouseover", () => {
        game.mode.easy = true
        game.choseMode();
        hardButton.classList.remove(`chose-one`)
        normalButton.classList.remove(`chose-one`)
        easyButton.classList.add (`chose-one`)
        console.log("mouseover")
    })**/
  ////////////////////////////////CANVAS //////////////////////
});
