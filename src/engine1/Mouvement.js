let TOPMap;
let RIGHTMap; 
let LEFTMap;
let BOTTOMMap; 

let TOPPlayer;
let RIGHTPlayer; 
let LEFTPlayer;
let BOTTOMPlayer;


function canMoveMap(){
    //*boncing world
    worldBoncing = getWorldBoncingArray();
    TOPMap = isCamNotBoncingBorderWorld(rectCam, 'TOP', worldBoncing);
    RIGHTMap = isCamNotBoncingBorderWorld(rectCam, 'RIGHT', worldBoncing);
    LEFTMap = isCamNotBoncingBorderWorld(rectCam, 'LEFT', worldBoncing);
    BOTTOMMap = isCamNotBoncingBorderWorld(rectCam, 'BOTTOM', worldBoncing);
}

function canPlayerMove(){

    // get center position of player 
    let centerPlayer = getCenterOfRect([xPlayer,yPlayer, sideCarrousel,sideCarrousel])
    
    // get the current map layer where the player is on
    let currentPositionIndexInWorld = findIndexOfPositionIn2dArray(xPlayer,yPlayer,world1.World,sideCarrousel * nbRow,sideCarrousel * nbColumn,xStartWorld1, yStartWorld1, "map");
    let X = currentPositionIndexInWorld[0];
    let Y = currentPositionIndexInWorld[1];
    let arrayMapLayer = Maps[world1.World[Y][X]].layers[0];

    let ratioX = X * sideCarrousel * nbRow;
    let ratioY = Y * sideCarrousel * nbColumn;

    let indexPlayer = findIndexOfPositionIn2dArray(centerPlayer[0],centerPlayer[1],arrayMapLayer,sideCarrousel,sideCarrousel , xStartWorld1  + ratioX , yStartWorld1 + ratioY, "perso") //TODO regler probleme dans tools.js
    
    // console.log(indexPlayer)
}


function moveMap() {

    

    if (keyIsDown(LEFT_ARROW) && LEFTMap) {
        xStartWorld1 += 8;    
    }
    
    if (keyIsDown(RIGHT_ARROW) && RIGHTMap) {
        xStartWorld1 -= 8;
    }
    
    if (keyIsDown(UP_ARROW) && TOPMap) {
        yStartWorld1 += 8;
    }
    
    if (keyIsDown(DOWN_ARROW) && BOTTOMMap) {
        yStartWorld1 -= 8;
    }
    
}


function Move(){
    
    canMoveMap()
    canPlayerMove()


    moveMap()
    

}