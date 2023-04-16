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

let collisionX;
let collisionY;



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
    

    let nextBlockIsCollision = collisionWithArray(playerRect, Direction)

    //? return if can move
    switch(Direction){
        case "TOP":
            if (nextBlockIsCollision) {
                if(collisionPixel(collisionX, collisionY, playerRect)){
                    return false
                }else{
                    return true
                }
            }else{
                return true
            }
        case "BOTTOM":
            if (nextBlockIsCollision) {
                if(collisionPixel(collisionX, collisionY, playerRect)){
                    return false
                }else{
                    return true
                }
            }else{
                return true
            }
        case "LEFT":
            if (nextBlockIsCollision) {
                if(collisionPixel(collisionX, collisionY, playerRect)){
                    return false
                }else{
                    return true
                }
            }else{
                return true
            }
        case "RIGHT":
            if (nextBlockIsCollision) {
                if(collisionPixel(collisionX, collisionY, playerRect)){
                    return false
                }else{
                    return true
                }
            }else{
                return true
            }
    }
}

// verifie que le carrer de collision en face du perso n'entre pas dans la zone de collision du perso
function collisionPixel(xStartCollision, yStartCollision, playerRect){
    return rectIsInRect([xStartCollision,yStartCollision,sideCarrousel,sideCarrousel] , playerRect )
}


// verifie que selon la direction le carrer en face du perso n'est pas un bloc de collision
function collisionWithArray(playerRect, Direction){

    // ################# GET VARIABLE FOR COLLISION ###############
    let informationPlayeratRight = getInformationOfCenterOfPlayer([playerRect[0] + sideCarrousel,playerRect[1],playerRect[2],playerRect[3] ])
    let informationPlayerLeft = getInformationOfCenterOfPlayer([playerRect[0] - sideCarrousel,playerRect[1],playerRect[2],playerRect[3] ])
    let informationPlayer = getInformationOfCenterOfPlayer(playerRect)

    
    //! bug fix affichage player on the layer
    let yOfTheCurrentRectWherePlayerIsOn = yStartWorld1 + informationPlayer.CenterInWorld[1] * 11 * sideCarrousel + informationPlayer.Center[1] * sideCarrousel
    let nextDirection = ""
    //? si player is on top of the rect
    if ((yOfTheCurrentRectWherePlayerIsOn + sideCarrousel ) - ( sideCarrousel / 2 ) < informationPlayer.centerOfPlayer[1]) {
        fill(0,0,0)
        nextDirection = "BOTTOM"
    }else{
        nextDirection = "TOP"
        
        fill(255,255,255)
    }

    


    rect(xStartWorld1 + informationPlayer.CenterInWorld[0] * 11 * sideCarrousel + informationPlayer.Center[0] * sideCarrousel + sideCarrousel / 2, yStartWorld1 + informationPlayer.CenterInWorld[1] * 11 * sideCarrousel + informationPlayer.Center[1] * sideCarrousel,20,20)
    if (debugMode) {
    }


    let typeBlockRight = typeOfnextBlock(nextDirection, informationPlayeratRight.Center, informationPlayeratRight.CenterInWorld, layerCollision)
    let typeBlockLeft = typeOfnextBlock(nextDirection, informationPlayerLeft.Center, informationPlayerLeft.CenterInWorld, layerCollision)
    let typeBlockCenter = typeOfnextBlock(nextDirection, informationPlayer.Center, informationPlayer.CenterInWorld, layerCollision)

    // ################# TEST IF COLLISION ###################
    //! return if it is a collision
    let typeBlock = typeOfnextBlock(Direction, informationPlayer.Center, informationPlayer.CenterInWorld, layerCollision)
    
    //! bug fix affichage player on the layer
    if (typeBlockCenter != blockToNotCollision || typeBlockRight != blockToNotCollision || typeBlockLeft != blockToNotCollision) {
        console.log("collision")

        if (nextDirection === "TOP") {
            playerLayer = 3
        }else{
            playerLayer = 1
        }
    }
    
    //! return if can move
    if (typeBlock != blockToNotCollision) {
        return true
    }else{
        return false
    }
    
    
}

function getInformationOfCenterOfPlayer(playerRect){
    // get center of player 
    let centerOfPlayer = getCenterOfRect(playerRect)

    // get the index of the player in the world
    let CenterInWorld = findIndexOfPositionIn2dArray(centerOfPlayer[0],
                                                    centerOfPlayer[1],
                                                    world1.World,
                                                    sideCarrousel * nbColumn ,sideCarrousel * nbRow,xStartWorld1,
                                                    yStartWorld1,
                                                    "world");

    // get the current index of the player in the current MAP
    let Center = findIndexOfPositionIn2dArray(centerOfPlayer[0],
                                            centerOfPlayer[1],
                                            Maps[world1.World[CenterInWorld[1]][CenterInWorld[0]]].layers[0],
                                            sideCarrousel,
                                            sideCarrousel,
                                            xStartWorld1  + CenterInWorld[0] * sideCarrousel * nbRow,
                                            yStartWorld1 + CenterInWorld[1] * sideCarrousel * nbColumn,
                                            "perso");
                    
    //? draw a rect on the center of the player
    if (debugMode) {
        fill(0,0,255)
        rect(centerOfPlayer[0], centerOfPlayer[1], 5,5)
    }
            
    return {"centerOfPlayer" : centerOfPlayer, "CenterInWorld" : CenterInWorld, "Center" : Center}
}

function typeOfnextBlock(Direction, Center, CenterInWorld, layerTestBlock){

    //! for all direction the first condition is when the player is on the same map of his test
    //! and the second test is if the test is out the same map where is the player
    //! and finally i set up collision X and collision Y for test the collision with pixel

    StrMap = world1.World[CenterInWorld[1]][CenterInWorld[0]];
    switch(Direction){
        case "TOP":
            //! UP
            if (StrMap != undefined && Center[1] - 1 >= 0) {
                valueTop = Maps[StrMap].layers[layerTestBlock][Center[1] - 1][Center[0]];

                collisionX = xStartWorld1 + 11 * sideCarrousel * CenterInWorld[0] +  Center[0] * sideCarrousel;
                collisionY = yStartWorld1 + 11 * sideCarrousel * CenterInWorld[1] +  (Center[1] - 1) * sideCarrousel;

                if (debugMode) {
                    fill(255,150,0);
                    rect(collisionX,collisionY , 10,10);
                }
                
            }else if(Maps[world1.World[CenterInWorld[1] - 1][CenterInWorld[0]]]){
                valueTop = Maps[world1.World[CenterInWorld[1] - 1][CenterInWorld[0]]].layers[layerTestBlock][10][Center[0]];

                collisionX = xStartWorld1 + 11 * sideCarrousel * CenterInWorld[0]  +  Center[0] * sideCarrousel;
                collisionY = yStartWorld1 + 11 * sideCarrousel * ( CenterInWorld[1] - 1 ) +  10 * sideCarrousel;

                if (debugMode) {
                    fill(255,150,0);
                    rect(collisionX,collisionY , 10,10);
                }
            }

            return valueTop
        case "BOTTOM":
            //! DOWN
            if (StrMap != undefined && Center[1] + 1 <= 10) {
                valueDown = Maps[StrMap].layers[layerTestBlock][Center[1] + 1][Center[0]];

                collisionX = xStartWorld1 + 11 * sideCarrousel * CenterInWorld[0]  +  Center[0] * sideCarrousel;
                collisionY = yStartWorld1 + 11 * sideCarrousel * CenterInWorld[1]  +  ( Center[1] + 1 ) * sideCarrousel;
                
                if (debugMode) {
                    fill(255,150,0);
                    rect(collisionX,collisionY , 10,10);
                }

            }else if(Maps[world1.World[CenterInWorld[1] + 1][CenterInWorld[0]]] != undefined){
                valueDown = Maps[world1.World[CenterInWorld[1] + 1][CenterInWorld[0]]].layers[layerTestBlock][0][Center[0]];

                collisionX = xStartWorld1 + 11 * sideCarrousel * CenterInWorld[0]  +  Center[0] * sideCarrousel;
                collisionY = yStartWorld1 + 11 * sideCarrousel * ( CenterInWorld[1] + 1 )  +  0 * sideCarrousel;
                
                if (debugMode) {
                    fill(255,150,0);
                    rect(collisionX,collisionY , 10,10);
                }
            }
            return valueDown
        case "LEFT":
            //! LEFT
            if (StrMap != undefined && Center[0] - 1 >= 0) {
                valueLeft = Maps[StrMap].layers[layerTestBlock][Center[1]][Center[0] - 1];
        
                collisionX = xStartWorld1 + 11 * sideCarrousel * CenterInWorld[0]  +  ( Center[0] - 1 ) * sideCarrousel;
                collisionY = yStartWorld1 + 11 * sideCarrousel * CenterInWorld[1]  +  Center[1] * sideCarrousel;
        
                if (debugMode) {
                    fill(255,150,0);
                    rect(collisionX,collisionY , 10,10);
                }
            }else if (Maps[world1.World[CenterInWorld[1]][CenterInWorld[0] - 1 ]] != undefined){
                valueLeft = Maps[world1.World[CenterInWorld[1]][CenterInWorld[0] - 1 ]].layers[layerTestBlock][Center[1]][10];
        
                collisionX = xStartWorld1 + 11 * sideCarrousel * ( CenterInWorld[0] - 1 )  +  10 * sideCarrousel;
                collisionY = yStartWorld1 + 11 * sideCarrousel * CenterInWorld[1]  +  Center[1] * sideCarrousel;
        
                if (debugMode) {
                    fill(255,150,0);
                    rect(collisionX,collisionY , 10,10);
                }
            }

            return valueLeft
        case "RIGHT":
            //! RIGHT
            if(StrMap != undefined && Center[0] + 1 <= 10){
                valueRight = Maps[StrMap].layers[layerTestBlock][Center[1] ][Center[0] + 1];
                
                collisionX = xStartWorld1 + 11 * sideCarrousel * CenterInWorld[0]  +  ( Center[0] + 1 ) * sideCarrousel;
                collisionY = yStartWorld1 + 11 * sideCarrousel * CenterInWorld[1]  +  Center[1] * sideCarrousel;

                if (debugMode) {
                    fill(255,150,0);
                    rect(collisionX,collisionY , 10,10);
                }
            }else{
                valueRight = Maps[world1.World[CenterInWorld[1]][CenterInWorld[0] + 1 ]].layers[layerTestBlock][Center[1] ][0];

                collisionX = xStartWorld1 + 11 * sideCarrousel * ( CenterInWorld[0] + 1 )  +  0 * sideCarrousel;
                collisionY = yStartWorld1 + 11 * sideCarrousel * CenterInWorld[1]  +  Center[1] * sideCarrousel;

                if (debugMode) {
                    fill(255,150,0);
                    rect(collisionX,collisionY , 10,10);
                }
            }

            return valueRight;
    }
}


function moveMap() {

    rectBoncingPlayer = [xPlayer,yPlayer,sideCarrousel,sideCarrousel]//createNewRect(xPlayer,yPlayer, sideCarrousel,sideCarrousel, 0.5)
    // console.log(rectBoncingPlayer)
    if (debugMode) {
        fill(255,0,0,80)
        rect(rectBoncingPlayer[0],rectBoncingPlayer[1],rectBoncingPlayer[2],rectBoncingPlayer[3]) 
    }

    if (keyIsDown(LEFT_ARROW) && LEFTMap && canPlayerMove(rectBoncingPlayer,"LEFT")) {
        xStartWorld1 += speedMoveMap;    
    }
    
    if (keyIsDown(RIGHT_ARROW) && RIGHTMap && canPlayerMove(rectBoncingPlayer,"RIGHT")) {
        xStartWorld1 -= speedMoveMap;
    }
    
    if (keyIsDown(UP_ARROW) && TOPMap && canPlayerMove(rectBoncingPlayer,"TOP")) {
        yStartWorld1 += speedMoveMap;
    }
    
    if (keyIsDown(DOWN_ARROW) && BOTTOMMap && canPlayerMove(rectBoncingPlayer,"BOTTOM")) {
        yStartWorld1 -= speedMoveMap;
    }
    
}


function Move(){

    canMoveMap()

    moveMap()
    

}