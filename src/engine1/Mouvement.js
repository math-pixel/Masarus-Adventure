function moveMap() {

    //*boncing world
    worldBoncing = getWorldBoncingArray();
    let TOP = isCamNotBoncingBorderWorld(rectCam, 'TOP', worldBoncing);
    let RIGHT = isCamNotBoncingBorderWorld(rectCam, 'RIGHT', worldBoncing);
    let LEFT = isCamNotBoncingBorderWorld(rectCam, 'LEFT', worldBoncing);
    let BOTTOM = isCamNotBoncingBorderWorld(rectCam, 'BOTTOM', worldBoncing);


    // console.log("top", TOP,"right",RIGHT,"left",LEFT,"bottom",BOTTOM)

    if (keyIsDown(LEFT_ARROW) && LEFT) {
        xStartWorld1 += 8;    
    }
    
    if (keyIsDown(RIGHT_ARROW) && RIGHT) {
        xStartWorld1 -= 8;
    }
    
    if (keyIsDown(UP_ARROW) && TOP) {
        yStartWorld1 += 8;
    }
    
    if (keyIsDown(DOWN_ARROW) && BOTTOM) {
        yStartWorld1 -= 8;
    }
    
}


function Move(){
    moveMap()
}