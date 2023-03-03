

let frameRate = 0;
function movePlayer() {
    
    frameRate += 1;
    if (keyIsDown(LEFT_ARROW)) {
        direction = 2;
        addFrame(direction)
    }
    
    if (keyIsDown(RIGHT_ARROW)) {
        direction = 3;
        addFrame(direction)
    }
    
    if (keyIsDown(UP_ARROW)) {
        direction = 0;
        addFrame(direction)
        // console.log("yey")
    }
    
    if (keyIsDown(DOWN_ARROW)) {
        direction = 1;
        addFrame(direction)
    }
}

function addFrame(dir){
    if (frameRate % 7 === 0) {
        // console.log(currentFramePlayer, playerTileSet[dir].length)
        if (currentFramePlayer >= playerTileSet[dir].length - 1) {
            currentFramePlayer = 0;
        }else{
            currentFramePlayer += 1;
        }
    }  
}

function GridCoord(arrayCoord){
    GridCoord = arrayCoord;
}


function drawPlayer(){

    // let index = whichCaseInGrid(xPlayer,yPlayer,grid);

    // console.log(playerTile)

    fill(255,255,0);
    movePlayer()
    // rect( xPlayer,yPlayer, sideCarrousel,sideCarrousel);
    if(playerTileSet[direction][currentFramePlayer]){
        image(playerTileSet[direction][currentFramePlayer], xPlayer, yPlayer, sideCarrousel,sideCarrousel);
    }
    
}
