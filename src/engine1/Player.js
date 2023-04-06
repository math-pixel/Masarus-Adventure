

let frameRate = 0;
function movePlayer() {
    
    frameRate += 1;
    if (keyIsDown(LEFT_ARROW)) {
        direction = 2;
        moduloAnimation = 3
        addFrame(direction)
    }else if (keyIsDown(RIGHT_ARROW)) {
        direction = 3;
        moduloAnimation = 3
        addFrame(direction)
    }else if (keyIsDown(UP_ARROW)) {
        direction = 0;
        moduloAnimation = 3
        addFrame(direction)
        // console.log("yey")
    }else if (keyIsDown(DOWN_ARROW)) {
        direction = 1;
        moduloAnimation = 3
        addFrame(direction)
    }else{
        // IDLE animation in all direction
        if ( direction + 4 < playerTileSet.length ) {
            direction += 4
            // console.log(direction)
        }
        moduloAnimation = 7
        addFrame(direction)
    }
}

function addFrame(dir){
    if (frameRate % moduloAnimation === 0) {
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

    //! draw player
    if(playerTileSet[direction][currentFramePlayer]){
        image(playerTileSet[direction][currentFramePlayer], xPlayer, yPlayer, sideCarrousel,sideCarrousel);
    }else{
        image(playerTileSet[0][0], xPlayer, yPlayer, sideCarrousel,sideCarrousel);
    }
    
}
