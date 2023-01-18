
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

function CanAddMap(WorldActu, cameraRect){
    
    
  
    if (indexCornerTopLeft != null) {
      if (indexCornerTopLeft[0] == 0){
        console.log("left")
        console.log(GlobalMap.Map[indexMapActu[0]][indexMapActu[1]-1])
      }
      if (indexCornerTopLeft[1] == 0) {
        console.log("haut")
      }
    }
  
    if (indexCornerBottomRight != null) {
      if (indexCornerBottomRight[0] == grid.length-1){
        console.log("right")
      }
      if (indexCornerBottomRight[1] == grid.length-1) {
        console.log("bottom")
      }
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

    // let indexCornerTopLeft = whichCaseInGrid(tempx,tempy,currentWorldArray,sideCarrousel);

    let x2 = Xcam + currentWorldArray.length * sideCarrousel;
    let y2 = Ycam + currentWorldArray.length * sideCarrousel;


    // let indexCornerBottomRight = whichCaseInGrid(x2,y2,currentWorldArray,sideCarrousel);

    console.log(indexCornerTopLeft)
}

function mustAddMapAtWorlds(){
    BoncingMapCamera()
}


function drawMap(){


    move();

    mustAddMapAtWorlds()
    
    
    


    ArrayWorldDisplay.forEach((elm, index)=>{
        
        let indexElm = findIndexIn2dArray(fullMapWorld1.World,elm.name)
        drawingGrid(xStartWorld1 + elm.sizeCarrousel  * elm.nbRow * indexElm[1] ,yStartWorld1 + elm.sizeCarrousel  * elm.nbColumn * indexElm[0] ,sideCarrousel,sideCarrousel,elm.layers[0]);
    })

    //TODO faire une fonction qui verifie que quand les bords de la cam atteigne les limite de la grille actuelle on ajoute celon le JSON WORLDS
    //TODO pouvoir lire dans quel index le xCam et yCam ( corner haut gauche ) ce situe
    //TODO si full gauche ou full haut ajouter la map correspondate dans le tableau ArrayWorldDisplay 
    //TODO else il doit y avoir que 1 seul map dans le tableau
    
    
    //? comment faire pour changer de tableau actuelle ?


    fill(0,255,255,80)
    rect(Xcam, Ycam,sideCarrousel*8,sideCarrousel*4)

}