function movePlayer() {

    if (keyIsDown(LEFT_ARROW)) {
        xPlayer -= 5;
    }
    
    if (keyIsDown(RIGHT_ARROW)) {
        xPlayer += 5;
    }
    
    if (keyIsDown(UP_ARROW)) {
        yPlayer -= 5;
    }
    
    if (keyIsDown(DOWN_ARROW)) {
        yPlayer += 5;
    }
    
}

function GridCoord(arrayCoord){
    GridCoord = arrayCoord;
}


function drawPlayer(){

    // let index = whichCaseInGrid(xPlayer,yPlayer,grid);


    fill(255,255,0);
    // movePlayer()
    rect(xPlayer,yPlayer, sideCarrousel,sideCarrousel);
}
