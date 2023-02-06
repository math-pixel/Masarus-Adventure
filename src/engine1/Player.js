


function movePlayer() {
    playerTile = persoTop
    if (keyIsDown(LEFT_ARROW)) {
        playerTile = persoLeft
    }
    
    if (keyIsDown(RIGHT_ARROW)) {
        playerTile = persoRight
    }
    
    if (keyIsDown(UP_ARROW)) {
        playerTile = persoTop;
        // console.log("yey")
    }
    
    if (keyIsDown(DOWN_ARROW)) {
        playerTile = persoDown
    }



}

function GridCoord(arrayCoord){
    GridCoord = arrayCoord;
}


function drawPlayer(){

    // let index = whichCaseInGrid(xPlayer,yPlayer,grid);

    // console.log(playerTile)

    fill(255,255,0);
    // movePlayer()
    // rect( xPlayer,yPlayer, sideCarrousel,sideCarrousel);
    
    
    image(playerTile[1], xPlayer, yPlayer, sideCarrousel,sideCarrousel);
}
