let currentDrawingImage;

// function to draw map
function drawingGrid(x,y,w,h,array){
    noStroke();
    for (let row = 0; row < array[0].length; row++) {
        for (let column = 0; column < array.length; column++) {
            
            image(allTiles[array[column][row]],x+w*row,y+h*column,w,h);
            // rect(x+w*row,y+h*column,w,h);          
        }
    }

    const maxWidht = w * array.length;
    const maxHeight = w * array[0].length;
    coordMap = [x,y,x + maxWidht , y + maxHeight];// coord de la map rect[x1,y1,x2,y2]
}

function drawingCollision(x,y,w,h,array){
    noStroke();
    for (let row = 0; row < array[0].length; row++) {
        for (let column = 0; column < array.length; column++) {
            
            if(array[column][row] !== blockToNotCollision){
                // console.log("collision")
                fill(255,255,0,50)
                rect(x+w*row,y+h*column,w,h); 
            }
        }
    }
}

// si out of array
// camera stop avant de voir la sortie du tableau
    
//? add the nine map arround the player
function mustAddMapAtWorlds(){

    ArrayWorldDisplay = [] //clear map
    
    let currentPositionIndexInWorld = findIndexOfPositionIn2dArray(xPlayer,yPlayer,world1.World,sideCarrousel * nbRow,sideCarrousel * nbColumn, xStartWorld1, yStartWorld1, "map");


    let currentX = currentPositionIndexInWorld[0];
    let currentY = currentPositionIndexInWorld[1];

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


// get limite of the world
function getWorldBoncingArray(){

    let xMin = xStartWorld1 + sideCarrousel;
    let yMin = yStartWorld1 + sideCarrousel;
    let xMax = ( xStartWorld1 + sideCarrousel * nbRow * world1.World[0].length) - sideCarrousel ;
    let yMax = ( yStartWorld1 + sideCarrousel * nbColumn * world1.World.length) - sideCarrousel ;

    return [xMin,yMin,xMax,yMax]
}

//? verifie que la camera ( les contour du canvas remplacer par un rectangle ) ne regarde pas a lexterieur de la map | check that the camera (the outline of the canvas replaced by a rectangle) does not look outside the map
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


// draw tilemap and his name
function drawDebugMap(currentMap, indexElm){

        textAlign(LEFT);
        textSize(50);
        strokeWeight(2);
        textFont(fontGravityBold);
        fill(255,100,0)
        text(currentMap.name,xStartWorld1 + sideCarrousel  * nbRow * indexElm[1] ,yStartWorld1 + sideCarrousel  * nbColumn * indexElm[0] + 100)
        
        noFill()
        stroke(8)
        strokeWeight(4);
        rect(xStartWorld1 + sideCarrousel  * nbRow * indexElm[1] ,yStartWorld1 + sideCarrousel  * nbColumn * indexElm[0] ,sideCarrousel * nbRow,sideCarrousel * nbColumn)

}