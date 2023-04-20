let doingBackFlip = false;
let intervalBackflip = 0;
let frameRatePlayer = 0;


function movePlayer() {
    
    //? for modulo operation
    frameRatePlayer += 1;

    if (keyIsDown(LEFT_ARROW)) {

        if (canMove) {
            //? reset easter egg time ( frame )
            intervalBackflip = 0

            //? set up the direction of the player
            direction = 2;

            //? set up the time frame between each frame of the animation
            moduloAnimation = 3

            //? add frame for animation
            addFrame(direction)
        }

    }else if (keyIsDown(RIGHT_ARROW)) {

        if (canMove) {
            intervalBackflip = 0
            direction = 3;
            moduloAnimation = 3
            addFrame(direction)
        }

    }else if (keyIsDown(UP_ARROW)) {

        if (canMove) {
            intervalBackflip = 0
            direction = 0;
            moduloAnimation = 3
            addFrame(direction)
            // console.log("yey")
        }
        
    }else if (keyIsDown(DOWN_ARROW)) {

        if (canMove) {
            intervalBackflip = 0
            direction = 1;
            moduloAnimation = 3
            addFrame(direction)
        }

    }else{
        // IDLE animation in all direction

        
        if (!doingBackFlip) {

            //! set idle animation 
            if ( direction + 4 < 8 ) {
                direction += 4
            }

            //! set backflip animation easter egg
            if (intervalBackflip > 1000) {
                direction = 8
                doingBackFlip = true
            }
        }

        intervalBackflip += 1
        moduloAnimation = 7
        addFrame(direction)
    }
}

function addFrame(dir){

    
    if (frameRatePlayer % moduloAnimation === 0) {

        if (currentFramePlayer >= playerTileSet[dir].length - 1) {
            
            currentFramePlayer = 0;


            //! reset backflip
            if (doingBackFlip) {
                direction = 5
                doingBackFlip = false
                intervalBackflip = 1
            }

        }else{
            currentFramePlayer += 1;
        }
        
        
    }
    

    
}


function drawPlayer(){

    // let index = whichCaseInGrid(xPlayer,yPlayer,grid);

    // console.log(playerTile)


    fill(255,255,0);
    movePlayer()

    // rect( xPlayer,yPlayer, sideCarrousel,sideCarrousel);

    //! draw player
    if(playerTileSet[direction][currentFramePlayer]){
        image(playerTileSet[direction][currentFramePlayer], xPlayer, yPlayer, sideCarrousel,sideCarrousel);
    }else{
        image(playerTileSet[direction][0], xPlayer, yPlayer, sideCarrousel,sideCarrousel);
    }
    
}
