function movePlayer() {
    
    //? for modulo operation
    frameRatePlayer += 1;

    if ((keyIsDown(LEFT_ARROW) || keyIsDown(81)) && canMove) {//? q

        playerNearToLandslide = false
        playerNearToTheRock = false

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

    }else if ((keyIsDown(RIGHT_ARROW)|| keyIsDown(68)) && canMove) {//? d

        playerNearToLandslide = false
        playerNearToTheRock = false

        if (canMove) {
            intervalBackflip = 0
            direction = 3;
            moduloAnimation = 3
            addFrame(direction)
        }

    }else if ((keyIsDown(UP_ARROW) || keyIsDown(90)) && canMove) {//? z

        playerNearToLandslide = false
        playerNearToTheRock = false

        if (canMove) {
            intervalBackflip = 0
            direction = 0;
            moduloAnimation = 3
            addFrame(direction)
            // console.log("yey")
        }
        
    }else if ((keyIsDown(DOWN_ARROW) || keyIsDown(83)) && canMove) {//? s

        playerNearToLandslide = false
        playerNearToTheRock = false
        
        if (canMove) {
            intervalBackflip = 0
            direction = 1;
            moduloAnimation = 3
            addFrame(direction)
        }

    }else{

        if (!doingBackFlip) {

            if (!displayDialogue) {
                canMove = true
            }

            //! set idle animation 
            if ( direction + 4 < 8 ) {
                direction += 4
            }

            //! set backflip animation easter egg
            if (intervalBackflip > 2000 && direction == 7 && !displayDialogue) {
                direction = 8
                currentFramePlayer = 0
                doingBackFlip = true
            }
        }else{
            canMove = false
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

            //? change height for backflip
            if (doingBackFlip) {
                // console.warn(currentFramePlayer)
                switch (currentFramePlayer){
                    case 3:
                        yPlayer -= 8
                    break;

                    case 4:
                        yPlayer -= 10
                    break;

                    case 5:
                        yPlayer -= 15
                    break;

                    case 7:
                        yPlayer += 15
                    break;

                    case 8:
                        yPlayer += 10
                    break;

                    case 9:
                        yPlayer += 8
                    break;
                }
            }
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
