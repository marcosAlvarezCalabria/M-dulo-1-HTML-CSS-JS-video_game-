window.addEventListener("load",()=>{
    const game = new Game ("main-canvas")

    game.star();

    document.addEventListener("keydown",(event) => game.onkeyEvent(event))
    document.addEventListener("keyup", (event) => game.onKeyEvent(event))


})