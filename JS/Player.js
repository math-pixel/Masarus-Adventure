function move() {

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


function pointIsInside(x,y,RectPos){
    return (x > RectPos[0] && x < RectPos[2] && y > RectPos[1] && y < RectPos[3]);
} 

function whichCaseInGrid(PlayerX,PlayerY,array){
    for (let row = 0; row < array[0].length; row++) {
        for (let column = 0; column < array.length; column++) { 

            let x = GridCoord[0]+50*row;
            let y = GridCoord[1]+50*column;

            // console.log([x,y,x + width, y + height])

            if (pointIsInside(PlayerX,PlayerY,[x,y,x + 50, y + 50])){
                return([row,column]);
            }         
        }
    }
    return null;
}


function drawPlayer(){

    // let index = whichCaseInGrid(xPlayer,yPlayer,grid);


    fill(255,255,0);
    move()
    rect(xPlayer,yPlayer, sideCarrousel,sideCarrousel);
}
