
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

function CanAddMap(){
    
    // current position of player in World
    let currentPositionIndexInWorld = findIndexOfPositionIn2dArray(xPlayer,yPlayer,fullMapWorld1.World,sideCarrousel * 11,sideCarrousel * 11);

    // console.log(currentPositionIndexInWorld)
    // add the nine map arround the player

    let currentX = currentPositionIndexInWorld[0];
    let currentY = currentPositionIndexInWorld[1]

    // Haut Gauche
    if (fullMapWorld1.World[currentY-1][currentX-1] !== undefined) {
        ArrayWorldDisplay.push(worlds1[fullMapWorld1.World[currentY-1][currentX-1]]);
    }
    
    // Haut Milieu 
    if (fullMapWorld1.World[currentY-1][currentX-1] !== undefined) {
        ArrayWorldDisplay.push(worlds1[fullMapWorld1.World[currentY -1][currentX]]);
    }
    
    // Haut Droite
    if (fullMapWorld1.World[currentY -1][currentX +1] !== undefined) {
        ArrayWorldDisplay.push(worlds1[fullMapWorld1.World[currentY -1][currentX +1]]);
    }
    
    // Milieu Gauche
    if ( fullMapWorld1.World[currentY][currentX -1] !== undefined) {
        ArrayWorldDisplay.push(worlds1[fullMapWorld1.World[currentY][currentX -1]]);
    }
    
    // Milieu Milieu => current Pos
    if ( fullMapWorld1.World[currentY][currentX] !== undefined) {
        ArrayWorldDisplay.push(worlds1[fullMapWorld1.World[currentY][currentX]]);
    }
    
    // Milieu Droite 
    if ( fullMapWorld1.World[currentY][currentX + 1] !== undefined) {
        ArrayWorldDisplay.push(worlds1[fullMapWorld1.World[currentY][currentX + 1]]);
    }
    
    // Bas Gauche 
    if ( fullMapWorld1.World[currentY + 1][currentX -1] !== undefined) {
        ArrayWorldDisplay.push(worlds1[fullMapWorld1.World[currentY + 1][currentX -1]]);
    } 
    
    // Bas Milieu
    if ( fullMapWorld1.World[currentY +1][currentX] !== undefined) {
        ArrayWorldDisplay.push(worlds1[fullMapWorld1.World[currentY +1][currentX]]);
    }
    
    // Bas Droite
    if ( fullMapWorld1.World[currentY +1][currentX +1] !== undefined) {
        ArrayWorldDisplay.push(worlds1[fullMapWorld1.World[currentY +1][currentX +1]]);
    }

}

function move() {

    if (keyIsDown(LEFT_ARROW)) {
        xStartWorld1 -= 5;    
    }
    
    if (keyIsDown(RIGHT_ARROW)) {
        xStartWorld1 += 5;
    }
    
    if (keyIsDown(UP_ARROW)) {
        yStartWorld1 -= 5;
    }
    
    if (keyIsDown(DOWN_ARROW)) {
        yStartWorld1 += 5;
    }
    
}

function BoncingMapCamera(currentWorldArray){

    ArrayWorldDisplay = [] //clear map


    CanAddMap()

    // // console.log(currentPositionIndexInWorld)
    // if (currentPositionIndexInWorld[0] === 0 || currentPositionIndexInWorld[0] === fullMapWorld1.World[0].length ) {
    //     console.log("not border")
    // }


    

    //* append tous les world autour de currentPositionIndexInWorld => ok

    //TODO verif que on est pas out of array 

    // si out of array
        // camera stop avant de voir la sortie du tableau
}

function mustAddMapAtWorlds(){
    BoncingMapCamera()
}


function drawMap(){


    move();

    
    mustAddMapAtWorlds()
    
    
    


    ArrayWorldDisplay.forEach((elm, index)=>{
        
        // console.log(elm);
        let indexElm = findIndexValueIn2dArray(fullMapWorld1.World,elm.name)
        //x,y,w,h,array
        drawingGrid(xStartWorld1 + sideCarrousel  * elm.nbRow * indexElm[1] ,yStartWorld1 + sideCarrousel  * elm.nbColumn * indexElm[0] ,sideCarrousel,sideCarrousel,elm.layers[0]);
    })

    //TODO faire une fonction qui verifie que quand les bords de la cam atteigne les limite de la grille actuelle on ajoute celon le JSON WORLDS
    //TODO pouvoir lire dans quel index le xCam et yCam ( corner haut gauche ) ce situe
    //TODO si full gauche ou full haut ajouter la map correspondate dans le tableau ArrayWorldDisplay 
    //TODO else il doit y avoir que 1 seul map dans le tableau
    
    
    //? comment faire pour changer de tableau actuelle ?


    // fill(0,255,255,80)
    // rect(Xcam, Ycam,sideCarrousel*8,sideCarrousel*4)

}