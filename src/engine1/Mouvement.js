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

function collisionPixel(xStartCollision, yStartCollision, playerRect){
    console.log( [xStartCollision,yStartCollision,sideCarrousel,sideCarrousel], mouseX, mouseY    )
    return rectIsInRect([xStartCollision,yStartCollision,sideCarrousel,sideCarrousel] , playerRect )
}

function collisionWithArray(playerRect, Direction){

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

    switch(Direction){
        case "TOP":
            //! UP
            if (StrMap != undefined && Center[1] - 1 >= 0) {
                valueTop = Maps[StrMap].collision[Center[1] - 1][Center[0]];

                collisionX = xStartWorld1 + 11 * sideCarrousel * CenterInWorld[0] +  Center[0] * sideCarrousel;
                collisionY = yStartWorld1 + 11 * sideCarrousel * CenterInWorld[1] +  (Center[1] - 1) * sideCarrousel;

                if (drawCollision) {
                    fill(255,150,0);
                    rect(collisionX,collisionY , 10,10);
                }
                
            }else if(Maps[world1.World[CenterInWorld[1] - 1][CenterInWorld[0]]]){
                valueTop = Maps[world1.World[CenterInWorld[1] - 1][CenterInWorld[0]]].collision[10][Center[0]];

                collisionX = xStartWorld1 + 11 * sideCarrousel * CenterInWorld[0]  +  Center[0] * sideCarrousel;
                collisionY = yStartWorld1 + 11 * sideCarrousel * ( CenterInWorld[1] - 1 ) +  10 * sideCarrousel;

                if (drawCollision) {
                    fill(255,150,0);
                    rect(collisionX,collisionY , 10,10);
                }
            }

            return valueTop
        case "BOTTOM":
            //! DOWN
            if (StrMap != undefined && Center[1] + 1 <= 10) {
                valueDown = Maps[StrMap].collision[Center[1] + 1][Center[0]];

                collisionX = xStartWorld1 + 11 * sideCarrousel * CenterInWorld[0]  +  Center[0] * sideCarrousel;
                collisionY = yStartWorld1 + 11 * sideCarrousel * CenterInWorld[1]  +  ( Center[1] + 1 ) * sideCarrousel;
                
                if (drawCollision) {
                    fill(255,150,0);
                    rect(collisionX,collisionY , 10,10);
                }

            }else if(Maps[world1.World[CenterInWorld[1] + 1][CenterInWorld[0]]] != undefined){
                valueDown = Maps[world1.World[CenterInWorld[1] + 1][CenterInWorld[0]]].collision[0][Center[0]];

                collisionX = xStartWorld1 + 11 * sideCarrousel * CenterInWorld[0]  +  Center[0] * sideCarrousel;
                collisionY = yStartWorld1 + 11 * sideCarrousel * ( CenterInWorld[1] + 1 )  +  0 * sideCarrousel;
                
                if (drawCollision) {
                    fill(255,150,0);
                    rect(collisionX,collisionY , 10,10);
                }
            }
            return valueDown
        case "LEFT":
            //! LEFT
            if (StrMap != undefined && Center[0] - 1 >= 0) {
                valueLeft = Maps[StrMap].collision[Center[1]][Center[0] - 1];
        
                collisionX = xStartWorld1 + 11 * sideCarrousel * CenterInWorld[0]  +  ( Center[0] - 1 ) * sideCarrousel;
                collisionY = yStartWorld1 + 11 * sideCarrousel * CenterInWorld[1]  +  Center[1] * sideCarrousel;
        
                if (drawCollision) {
                    fill(255,150,0);
                    rect(collisionX,collisionY , 10,10);
                }
            }else if (Maps[world1.World[CenterInWorld[1]][CenterInWorld[0] - 1 ]] != undefined){
                valueLeft = Maps[world1.World[CenterInWorld[1]][CenterInWorld[0] - 1 ]].collision[Center[1]][10];
        
                collisionX = xStartWorld1 + 11 * sideCarrousel * ( CenterInWorld[0] - 1 )  +  10 * sideCarrousel;
                collisionY = yStartWorld1 + 11 * sideCarrousel * CenterInWorld[1]  +  Center[1] * sideCarrousel;
        
                if (drawCollision) {
                    fill(255,150,0);
                    rect(collisionX,collisionY , 10,10);
                }
            }

            return valueLeft
        case "RIGHT":
            //! RIGHT
            if(StrMap != undefined && Center[0] + 1 <= 10){
                valueRight = Maps[StrMap].collision[Center[1] ][Center[0] + 1];
                
                collisionX = xStartWorld1 + 11 * sideCarrousel * CenterInWorld[0]  +  ( Center[0] + 1 ) * sideCarrousel;
                collisionY = yStartWorld1 + 11 * sideCarrousel * CenterInWorld[1]  +  Center[1] * sideCarrousel;

                if (drawCollision) {
                    fill(255,150,0);
                    rect(collisionX,collisionY , 10,10);
                }
            }else{
                valueRight = Maps[world1.World[CenterInWorld[1]][CenterInWorld[0] + 1 ]].collision[Center[1] ][0];

                collisionX = xStartWorld1 + 11 * sideCarrousel * ( CenterInWorld[0] + 1 )  +  0 * sideCarrousel;
                collisionY = yStartWorld1 + 11 * sideCarrousel * CenterInWorld[1]  +  Center[1] * sideCarrousel;

                if (drawCollision) {
                    fill(255,150,0);
                    rect(collisionX,collisionY , 10,10);
                }
            }

            return valueRight;
    }

}


function moveMap() {

    rectBoncingPlayer = [xPlayer,yPlayer,sideCarrousel,sideCarrousel]//createNewRect(xPlayer,yPlayer, sideCarrousel,sideCarrousel, 0.5)
    
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