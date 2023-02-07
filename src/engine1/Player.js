


function movePlayer() {

    if (keyIsDown(LEFT_ARROW)) {
        direction = 2;
    }
    
    if (keyIsDown(RIGHT_ARROW)) {
        direction = 3;
    }
    
    if (keyIsDown(UP_ARROW)) {
        direction = 0;
        // console.log("yey")
    }
    
    if (keyIsDown(DOWN_ARROW)) {
        direction = 1;
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
    
    
    image(playerTileSet[direction][currentFramePlayer], xPlayer, yPlayer, sideCarrousel,sideCarrousel);
}
