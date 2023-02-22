let TOPMap;
let RIGHTMap; 
let LEFTMap;
let BOTTOMMap; 

let TOPPlayer;
let RIGHTPlayer; 
let LEFTPlayer;
let BOTTOMPlayer;

let StrMap;
let valueTop;
let valueDown;
let valueLeft;
let valueRight;

//? set rectBoncingPlayer % of player rect
let rectBoncingPlayer = createNewRect(xPlayer,yPlayer, sideCarrousel,sideCarrousel, 0.5);


function canMoveMap(){
    //*boncing world
    worldBoncing = getWorldBoncingArray();
    TOPMap = isCamNotBoncingBorderWorld(rectCam, 'TOP', worldBoncing);
    RIGHTMap = isCamNotBoncingBorderWorld(rectCam, 'RIGHT', worldBoncing);
    LEFTMap = isCamNotBoncingBorderWorld(rectCam, 'LEFT', worldBoncing);
    BOTTOMMap = isCamNotBoncingBorderWorld(rectCam, 'BOTTOM', worldBoncing);
}

function canPlayerMove(playerRect, Direction){
   
    //? get the current map layer where the player is on the world
    let TopLeftInWorld = findIndexOfPositionIn2dArray(playerRect[0],
                                                      playerRect[1],
                                                      world1.World,
                                                      sideCarrousel * nbColumn ,sideCarrousel * nbRow,xStartWorld1,
                                                      yStartWorld1,
                                                      "world");

    let TopRightInWorld = findIndexOfPositionIn2dArray(playerRect[0] + playerRect[2],
                                                       playerRect[1],
                                                       world1.World,
                                                       sideCarrousel * nbRow,sideCarrousel * nbColumn,xStartWorld1,
                                                       yStartWorld1,
                                                       "map");

    let BottomLeftInWorld = findIndexOfPositionIn2dArray(playerRect[0],
                                                                             playerRect[1] + playerRect[3],
                                                                             world1.World,
                                                                             sideCarrousel * nbRow,sideCarrousel * nbColumn,
                                                                             xStartWorld1,
                                                                             yStartWorld1,
                                                                             "map");

    let BottomRightInWorld = findIndexOfPositionIn2dArray(playerRect[0] + playerRect[2],
                                                          playerRect[1] + playerRect[3],
                                                          world1.World,
                                                          sideCarrousel * nbRow,
                                                          sideCarrousel * nbColumn,
                                                          xStartWorld1,
                                                          yStartWorld1,
                                                          "map");


    //? get index point on the current map 



    let TopLeft = findIndexOfPositionIn2dArray(playerRect[0],
                                               playerRect[1],
                                               Maps[world1.World[TopLeftInWorld[1]][TopLeftInWorld[0]]].layers[0],
                                               sideCarrousel,
                                               sideCarrousel,
                                               xStartWorld1  + TopLeftInWorld[0] * sideCarrousel * nbRow,
                                               yStartWorld1 + TopLeftInWorld[1] * sideCarrousel * nbColumn,
                                               "perso");
    
    let TopRight = findIndexOfPositionIn2dArray(playerRect[0] + playerRect[2],
                                                playerRect[1],
                                                Maps[world1.World[TopRightInWorld[1]][TopRightInWorld[0]]].layers[0],
                                                sideCarrousel,
                                                sideCarrousel,
                                                xStartWorld1  + TopRightInWorld[0] * sideCarrousel * nbRow,
                                                yStartWorld1 + TopRightInWorld[1] * sideCarrousel * nbColumn,
                                                "perso");

    let BottomLeft = findIndexOfPositionIn2dArray(playerRect[0],
                                                  playerRect[1] + playerRect[3],
                                                  Maps[world1.World[BottomLeftInWorld[1]][BottomLeftInWorld[0]]].layers[0],
                                                  sideCarrousel,
                                                  sideCarrousel,
                                                  xStartWorld1  + BottomLeftInWorld[0] * sideCarrousel * nbRow,
                                                  yStartWorld1 + BottomLeftInWorld[1] * sideCarrousel * nbColumn,
                                                  "perso");

    let BottomRight = findIndexOfPositionIn2dArray(playerRect[0] + playerRect[2],
                                                   playerRect[1] + playerRect[3],
                                                   Maps[world1.World[BottomRightInWorld[1]][BottomRightInWorld[0]]].layers[0] ,
                                                   sideCarrousel,
                                                   sideCarrousel,
                                                   xStartWorld1  + BottomRightInWorld[0] * sideCarrousel * nbRow ,
                                                   yStartWorld1 + BottomRightInWorld[1] * sideCarrousel * nbColumn,
                                                   "perso");
    

    preshotCollision(playerRect)

    console.log("top : ", valueTop, "bottom : ", valueDown, "left : ", valueLeft, "right : ", valueRight)

    //? return if can move
    switch(Direction){
        case "TOP":
            if (valueTop) {
                if (Maps[world1.World[TopLeftInWorld[1]][TopLeftInWorld[0]]].collision[TopLeft[1]][TopLeft[0]] === 1 || Maps[world1.World[TopRightInWorld[1]][TopRightInWorld[0]]].collision[TopRight[1]][TopRight[0]] === 1) {
                    return false;
                }else{
                    return true
                }
            }else{
                return true
            }
            break;
        case "BOTTOM":
            if (valueDown) {
                if (Maps[world1.World[BottomLeftInWorld[1]][BottomLeftInWorld[0]]].collision[BottomLeft[1]][BottomLeft[0]] === 1 || Maps[world1.World[BottomRightInWorld[1]][BottomRightInWorld[0]]].collision[BottomRight[1]][BottomRight[0]] === 1) {
                    return false;
                }else{
                    return true
                }
            }else{
                return true
            }
            break;
        case "LEFT":
            if (valueLeft) {
                if (Maps[world1.World[TopLeftInWorld[1]][TopLeftInWorld[0]]].collision[TopLeft[1]][TopLeft[0]] === 1 || Maps[world1.World[BottomLeftInWorld[1]][BottomLeftInWorld[0]]].collision[BottomLeft[1]][BottomLeft[0]] === 1) {
                    return false;
                }else{
                    return true
                }
            }else{
                return true
            }
            break;
        case "RIGHT":
            if (valueRight) {
                if (Maps[world1.World[BottomRightInWorld[1]][BottomRightInWorld[0]]].collision[BottomRight[1]][BottomRight[0]] === 1 || Maps[world1.World[TopRightInWorld[1]][TopRightInWorld[0]]].collision[TopRight[1]][TopRight[0]] === 1) {
                    return false;
                }else{
                    return true
                }
            }else{
                return true
            }
            break;
    }
}


function preshotCollision(playerRect){

    let centerOfPlayer = getCenterOfRect(playerRect)
    let CenterInWorld = findIndexOfPositionIn2dArray(centerOfPlayer[0],
                                                    centerOfPlayer[1],
                                                    world1.World,
                                                    sideCarrousel * nbColumn ,sideCarrousel * nbRow,xStartWorld1,
                                                    yStartWorld1,
                                                    "world");
    
    if (drawCollision) {
        fill(0,0,255)
        rect(centerOfPlayer[0], centerOfPlayer[1], 5,5)
    }

    let Center = findIndexOfPositionIn2dArray(centerOfPlayer[0],
                                            centerOfPlayer[1],
                                            Maps[world1.World[CenterInWorld[1]][CenterInWorld[0]]].layers[0],
                                            sideCarrousel,
                                            sideCarrousel,
                                            xStartWorld1  + CenterInWorld[0] * sideCarrousel * nbRow,
                                            yStartWorld1 + CenterInWorld[1] * sideCarrousel * nbColumn,
                                            "perso");


    StrMap = world1.World[CenterInWorld[1]][CenterInWorld[0]];
    // console.log(StrMap)

    //TODO changer les values 0 & 10 des condition avec des .length

    //! UP
    if (StrMap != undefined && Center[1] - 1 > 0) {
        valueTop = Maps[StrMap].collision[Center[1] - 1][Center[0]];
    }else if(CenterInWorld[1] != 0){
        valueTop = Maps[world1.World[CenterInWorld[1] - 1][CenterInWorld[0]]].collision[10][Center[0]];
    }

    //! DOWN
    if (StrMap != undefined && Center[1] + 1 <= 10) {
        valueDown = Maps[StrMap].collision[Center[1] + 1][Center[0]];
    }else{
        valueDown = Maps[world1.World[CenterInWorld[1] + 1][CenterInWorld[0]]].collision[0][Center[0]];
    }

    //! LEFT
    if (StrMap != undefined && Center[0] - 1 > 0) {
        valueLeft = Maps[StrMap].collision[Center[1]][Center[0] - 1];
    }else if(CenterInWorld[0] != 0){
        valueLeft = Maps[world1.World[CenterInWorld[1]][CenterInWorld[0] - 1 ]].collision[Center[1]][10];
    }

    //! RIGHT
    if(StrMap != undefined && Center[0] + 1 <= 10){
        valueRight = Maps[StrMap].collision[Center[1] ][Center[0] + 1];
    }else{
        valueRight = Maps[world1.World[CenterInWorld[1]][CenterInWorld[0] + 1 ]].collision[Center[1] ][0];
    }
}


function moveMap() {

    rectBoncingPlayer = createNewRect(xPlayer,yPlayer, sideCarrousel,sideCarrousel, 0.5)
    
    if (drawCollision) {
        fill(255,0,0,80)
        rect(rectBoncingPlayer[0],rectBoncingPlayer[1],rectBoncingPlayer[2],rectBoncingPlayer[3]) 
    }

    if (keyIsDown(LEFT_ARROW) && LEFTMap && canPlayerMove(rectBoncingPlayer,"LEFT")) {
        xStartWorld1 += 8;    
    }
    
    if (keyIsDown(RIGHT_ARROW) && RIGHTMap && canPlayerMove(rectBoncingPlayer,"RIGHT")) {
        xStartWorld1 -= 8;
    }
    
    if (keyIsDown(UP_ARROW) && TOPMap && canPlayerMove(rectBoncingPlayer,"TOP")) {
        yStartWorld1 += 8;
    }
    
    if (keyIsDown(DOWN_ARROW) && BOTTOMMap && canPlayerMove(rectBoncingPlayer,"BOTTOM")) {
        yStartWorld1 -= 8;
    }
    
}


function Move(){

    canMoveMap()

    moveMap()
    

}