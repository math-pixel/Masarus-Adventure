function startEngine2(){
    // background(200);
    // image(backgroundImage, 0, 0)

    // fill(0,0,0,10)
    // rect(0,0,1000,578) 

    //! draw background
    image(imageBackgroundEng2, 0, 0 , 1000, 578)

    //! draw system engine
    setRandomRotation(MapPipeGame.Map.layers);
    drawMapEngine2(MapPipeGame.Map.layers);

    //! draw mouse animation ui
    drawMouseAnimation(0,0);

    if (debugMode) {
        fill(255,150,0)
        rect(0,0,30,20)   
    }
}

let frameMouse = 0
let indexMouseTileset = 0
function drawMouseAnimation(x,y){
    
    if (frameMouse % 50 === 0) {
        if (indexMouseTileset + 1 < mouseTileset.length) {
            indexMouseTileset += 1
        }else{
            indexMouseTileset = 0
        }
        
    }
    frameMouse +=1 
    console.log(indexMouseTileset.length)
    image(mouseTileset[indexMouseTileset], x, y)
}