window.addEventListener("load",()=>{
    const game = new Game ("main-canvas")

    //game.start()

    document.addEventListener("keydown",(event) => game.onKeyEvent(event))
    document.addEventListener("keyup", (event) => game.onKeyEvent(event))


    const playButton = document.getElementById(`btn-play`)

    playButton.addEventListener("click",() => {
        game.start()
        const windowStart = document.getElementById("star-panel") 
        const canvasWindow = document.getElementById ("main-canvas")
    
        windowStart.classList.add(`hidden`)
        canvasWindow.classList.remove(`hidden`)


    const gameOverButton = document.getElementById(`panel-game`)
    console.log(game.gameOverSwitch)

    


         
          })
              
    

    const startGameButton = document.getElementById(`btn-start-game`)
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
    
    const easyButton = document.getElementById(`btn-easy`)
    const hardButton = document.getElementById(`btn-hard`)
    const normalButton = document.getElementById(`btn-normal`)
    

    easyButton.addEventListener("click", () => {
        game.mode.easy = true
        game.choseMode();
        hardButton.classList.remove(`chose-one`)
        normalButton.classList.remove(`chose-one`)
        easyButton.classList.add (`chose-one`)
    })
    normalButton.addEventListener("click" , () => {
        game.mode.normal = true
        game.choseMode();
        easyButton.classList.remove (`chose-one`)
        hardButton.classList.remove (`chose-one`)
        normalButton.classList.add (`chose-one`)
    })

    hardButton.addEventListener("click" , () => {
        game.mode.hard = true
        game.choseMode()
        easyButton.classList.remove ( `chose-one`)
        normalButton.classList.remove(`chose-one` )
        hardButton.classList.add (`chose-one`)

    })


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
    
 
   
})