window.addEventListener("load",()=>{
    const game = new Game ("main-canvas")

    game.start()

    document.addEventListener("keydown",(event) => game.onKeyEvent(event))
    document.addEventListener("keyup", (event) => game.onKeyEvent(event))

    const startGameButton = document.getElementById(`btn-start-game`)
    startGameButton.addEventListener("click",()=>{
       //game.start()
    const windowStart = document.getElementById("star-panel") 
    const canvasWindow = document.getElementById ("main-canvas")

    windowStart.classList.add(`hiden`)
    canvasWindow.classList.remove(`hiden`)
     
    })


})