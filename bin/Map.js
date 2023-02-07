
function drawingGrid(x,y,w,h,array){

    for (let row = 0; row < array[0].length; row++) {
        for (let column = 0; column < array.length; column++) {

            if(array[column][row] === 0){
                fill(color(255, 255, 255));
            }if (array[column][row] === 1) {
                fill(color(255, 0, 0));
            }if(array[column][row] === 2){
                fill(color(0, 255, 0, 50));
            }if (array[column][row] === 3) {
                fill(color(0, 0, 255));
            }if(array[column][row] === 4){
                fill(color(255, 255, 0, 50));
            }if (array[column][row] === 5) {
                fill(color(0, 255, 255));
            }if(array[column][row] === 6){
                fill(color(255, 0, 255, 50));
            }if (array[column][row] === 7) {
                fill(color(50, 50, 0));
            }if (array[column][row] === 8) {
                fill(color(50, 150, 90));
            }
            
            rect(x+w*row,y+h*column,w,h);          
        }
    }

    const maxWidht = w * array.length;
    const maxHeight = w * array[0].length;
    coordMap = [x,y,x + maxWidht , y + maxHeight];// coord de la map rect[x1,y1,x2,y2]
}

function moveMap() {

    //*boncing world
    worldBoncing = getWorldBoncingArray();
    let TOP = isCamNotBoncingBorderWorld(rectCam, 'TOP', worldBoncing);
    let RIGHT = isCamNotBoncingBorderWorld(rectCam, 'RIGHT', worldBoncing);
    let LEFT = isCamNotBoncingBorderWorld(rectCam, 'LEFT', worldBoncing);
    let BOTTOM = isCamNotBoncingBorderWorld(rectCam, 'BOTTOM', worldBoncing);


    // console.log("top", TOP,"right",RIGHT,"left",LEFT,"bottom",BOTTOM)

    if (keyIsDown(LEFT_ARROW) && LEFT) {
        xStartWorld1 += 5;    
    }
    
    if (keyIsDown(RIGHT_ARROW) && RIGHT) {
        xStartWorld1 -= 5;
    }
    
    if (keyIsDown(UP_ARROW) && TOP) {
        yStartWorld1 += 5;
    }
    
    if (keyIsDown(DOWN_ARROW) && BOTTOM) {
        yStartWorld1 -= 5;
    }
    
}

// si out of array
    // camera stop avant de voir la sortie du tableau
function mustAddMapAtWorlds(){

    ArrayWorldDisplay = [] //clear map
    
    // current position of player in World
    let currentPositionIndexInWorld = findIndexOfPositionIn2dArray(xPlayer,yPlayer,world1.World,sideCarrousel * 11,sideCarrousel * 11);

    // console.log(currentPositionIndexInWorld)
    // add the nine map arround the player

    let currentX = currentPositionIndexInWorld[0];
    let currentY = currentPositionIndexInWorld[1];

    // console.log(currentX,currentY,world1.World[currentY][currentX]);


    // Haut Gauche
    if (currentX -1  >= 0 && currentY-1 >= 0  ) {
        ArrayWorldDisplay.push(Maps[world1.World[currentY-1][currentX-1]]);
    }
    
    // Haut Milieu 
    if (currentY-1 >= 0 ) {
        ArrayWorldDisplay.push(Maps[world1.World[currentY -1][currentX]]);
    }
    
    // Haut Droite
    if (currentX + 1 < world1.World[0].length &&  currentY-1 >= 0 ) {
        ArrayWorldDisplay.push(Maps[world1.World[currentY -1][currentX +1]]);
    }
    
    // Milieu Gauche
    if ( currentX -1 >= 0) {
        ArrayWorldDisplay.push(Maps[world1.World[currentY][currentX -1]]);
    }
    
    // Milieu Milieu => current Pos
    if ( world1.World[currentY][currentX] != undefined) {
        ArrayWorldDisplay.push(Maps[world1.World[currentY][currentX]]);
    }
    
    // Milieu Droite 
    if ( currentX + 1 < world1.World[0].length) {
        ArrayWorldDisplay.push(Maps[world1.World[currentY][currentX + 1]]);
    }
    
    // Bas Gauche 
    if ( currentX - 1 >= 0 && currentY + 1 < world1.World.length) {
        ArrayWorldDisplay.push(Maps[world1.World[currentY + 1][currentX -1]]);
    } 
    
    // Bas Milieu
    if ( currentY + 1 < world1.World.length) {
        ArrayWorldDisplay.push(Maps[world1.World[currentY +1][currentX]]);
    }
    
    // Bas Droite
    if (currentX + 1 < world1.World[0].length && currentY + 1 < world1.World.length) {
        ArrayWorldDisplay.push(Maps[world1.World[currentY +1][currentX +1]]);
    }
}

function getWorldBoncingArray(){

    let xMin = xStartWorld1 + sideCarrousel;
    let yMin = yStartWorld1 + sideCarrousel;
    let xMax = ( xStartWorld1 + sideCarrousel * nbRow * world1.World[0].length) - sideCarrousel ;
    let yMax = ( yStartWorld1 + sideCarrousel * nbColumn * world1.World.length) - sideCarrousel ;

    return [xMin,yMin,xMax,yMax]
}


function isCamNotBoncingBorderWorld(rectCam /*[x,y,x2,y2]*/, sideDirection, arrayWorld /*[x,y,x2,y2]*/){
    switch(sideDirection){
        case 'TOP':
            if (rectCam[1] > arrayWorld[1]) {
                return true
            }else{
                return false
            }
        case 'RIGHT':
            if (rectCam[2] < arrayWorld[2]) {
                return true
            }else{
                return false
            }
        case 'BOTTOM':
            if (rectCam[3] < arrayWorld[3]) {
                return true
            }else{
                return false
            }
        case 'LEFT':
            if (rectCam[0] > arrayWorld[0]) {
                return true
            }else{
                return false
            }
        default:
            return false
    }
}

function drawMap(){

    
    moveMap();
  
    mustAddMapAtWorlds();

    ArrayWorldDisplay.forEach((elm, index)=>{
        
        // console.log(elm);
        let indexElm = findIndexValueIn2dArray(world1.World,elm.name);
        //x,y,w,h,array
        drawingGrid(xStartWorld1 + sideCarrousel  * nbRow * indexElm[1] ,yStartWorld1 + sideCarrousel  * nbColumn * indexElm[0] ,sideCarrousel,sideCarrousel,elm.layers[0]);
    })

    fill(255,255,20,80)
    rect(Xcam,Ycam,Wcam,Hcam)

    // fill(0,255,255,80)
    // rect(Xcam, Ycam,sideCarrousel*8,sideCarrousel*4)

}