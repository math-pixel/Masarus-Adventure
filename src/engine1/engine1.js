let moduloAnimationNote = 5
function startEngine1(){

    //! draw map
    drawEngine1()

    if (isEndOfTheGame) {
        gameIsEnding()
    }

    //! move map and player
    if (canMove) {
        Move()
    }

    //! draw inventory
    if (!displayDialogue && !isEndOfTheGame) {
        drawInventory(1000 / 2 - globalSideInventoryX / 2,  578 -  ( globalSideInventoryY + 10 ) , sideCarrousel)
    }
    
    //! draw shamisen
    if(displayShamisen && !isEndOfTheGame){
        image(spriteSheetShamisen[currentSpriteShamisen], 1000 - 130 - 20, 20, 130, 153)
    }

    //! setting button
    if (!isEndOfTheGame) {
        image(setting_button_inGame[index_setting_button_inGame], 20,20,48,48 )
        actionOnText([20,20 ,48,48], "pauseMenu", setting_button_inGame[2])
    }


    //! draw note shamisen quest 2
    drawNote()

    //! draw current quest
    if(!displayDialogue && !isEndOfTheGame){
        drawQuest()
    }

    //! draw dialogue
    if (displayDialogue) {
        startEngineDialogue();
    }
    
}


function drawEngine1(){

    //! draw map
    mustAddMapAtWorlds();
    for (let loopLayer = 0; loopLayer < 5; loopLayer++) {
        
        ArrayWorldDisplay.forEach((elm, index)=>{

            //! get index current map in world
            let indexElm = findIndexValueIn2dArray(world1.World,elm.name);
            
            if (elm.layers[loopLayer]) {


                // let indexPlayerInWorld = findIndexOfPositionIn2dArray(xPlayer,yPlayer,world1.World,sideCarrousel * nbRow , sideCarrousel * nbColumn, xStartWorld1,yStartWorld1,"PlayerInWorld")

        
                //!draw map
                drawingGrid(xStartWorld1 + sideCarrousel  * nbRow * indexElm[1] ,yStartWorld1 + sideCarrousel  * nbColumn * indexElm[0] ,sideCarrousel,sideCarrousel, elm.layers[loopLayer]);


                //!do interaction
                if (loopLayer == layerInteraction) {
                    drawinteraction(xStartWorld1 + sideCarrousel  * nbRow * indexElm[1] ,yStartWorld1 + sideCarrousel  * nbColumn * indexElm[0] ,sideCarrousel,sideCarrousel, elm.layers[loopLayer] )
                }

                //! draw pnj and player

                if (index == ArrayWorldDisplay.length - 1) {//? to draw one time entity

                    //? for player be draw in front or behind collision
                    if ( loopLayer == playerLayer ) {
                        if (PNJinFrontOfPlayer) {
                            drawPlayer()
                            pnjManager()
                        }else{
                            pnjManager()
                            drawPlayer()
                        }
                    }

                    //? draw pnj if player is not on layer collision
                    if (loopLayer == layerCollision && playerLayer != layerCollision) {
                        pnjManager()
                    }
                }
                

            }

            //! draw collision
            if (loopLayer == layerCollision && debugMode) {
                drawingCollision(xStartWorld1 + sideCarrousel  * nbRow * indexElm[1] ,yStartWorld1 + sideCarrousel  * nbColumn * indexElm[0] ,sideCarrousel,sideCarrousel,elm.layers[loopLayer]);
                drawDebugMap(elm , indexElm)
            }
            
        });


    }

    

    //Cam
    fill(255,255,20,0)
    rect(Xcam,Ycam,Wcam,Hcam)



}


function drawNote(){

    if (lifeTimeNote > 0) {
        // console.log("lifetime" , lifeTimeNote)
        //! move note
        lifeTimeNote -= 1

        let distanceX =  ((xStartWorld1 + allPnj[2].xStart + allPnj[2].actualDistance) - xNote)
        let distanceY =  ((yStartWorld1 + allPnj[2].yStart) - yNote)

        let speedX = distanceX / 200
        let speedY = distanceY / 200

        xNote = xNote + speedX
        yNote = yNote + speedY

        // fill(255,0,0)
        // rect(xNote, yNote, 20, 20)

        //! note animation
        if (lifeTimeNote % 2 == 0) {     
            
            if ( songSpriteCurrentFrame + 1 < songSprite.length ) {
                songSpriteCurrentFrame += 1
            }else{
                songSpriteCurrentFrame = 0
            }
            
        }
        
        //! draw note
        image(songSprite[songSpriteCurrentFrame], xNote, yNote, 48, 48)
    }

}


function drawQuest(){

    //! display empty box
    if(!displayShamisen){
        // bacground
        image(quest_box_2, 1000 - 130 - 20 , 20, 130, 117)

        // current quest
        fill("#4c2512");
        textFont(fontTypeCastItalic);
        textAlign(CENTER);
        textSize(20);
        textLeading(15);
        // rect(1000 - 125 , 220 , 100 , 100)
        text(currentQuestDisplay, 1000 - 132 , 67 , 100 , 100)


        // " quete en cour "
        fill("#4c2512")
        textSize(25);
        textLeading(12);
        textAlign(CENTER);
        textFont(fontTypeCastBold);
        // rect(1000 - 125 , 210, 100, 30)
        text("Quête en cours", 1000 - 130 , 30, 100, 30)
    }else{


        // bacground
        image(quest_box_2, 1000 - 130 - 20 , 183, 130, 117)

        // current quest
        fill("#4c2512");
        textFont(fontTypeCastItalic);
        textAlign(CENTER);
        textSize(20);
        textLeading(15);
        // rect(1000 - 125 , 220 , 100 , 100)
        text(currentQuestDisplay, 1000 - 132 , 230 , 100 , 100)


        // " quete en cour "
        fill("#4c2512")
        textSize(25);
        textLeading(12);
        textAlign(CENTER);
        textFont(fontTypeCastBold);
        // rect(1000 - 125 , 210, 100, 30)
        text("Quête en cours", 1000 - 130 , 194, 100, 30)

    }
}

let lastTalkPnj = true
function gameIsEnding(){


    if(frameRatePlayer % moduloAnimationNote == 0){

        if (currentFrameMelodieSpriteSheet + 1 < anim_melodie_sprite_sheet.length) {
            currentFrameMelodieSpriteSheet += 1
            // moduloAnimationNote += 1
        }else{
            currentFrameMelodieSpriteSheet = 0

            //! restore flower
            Maps["tilemap_19"].layers = endingMap["tilemap_19"].layers
            Maps["tilemap_20"].layers = endingMap["tilemap_20"].layers
            Maps["tilemap_21"].layers = endingMap["tilemap_21"].layers
            Maps["tilemap_34"].layers = endingMap["tilemap_34"].layers
            Maps["tilemap_35"].layers = endingMap["tilemap_35"].layers
            Maps["tilemap_36"].layers = endingMap["tilemap_36"].layers

            // moduloAnimationNote = 5
        }
    }

    image(anim_melodie_sprite_sheet[currentFrameMelodieSpriteSheet], 40, 0, 1000, 578)



    canInteract = true
    
    //! set up dialogue
    textDialogue = ["Bravo Masaru", "Tu nous as tous sauvés", "L'île va enfin mieux."]
    endAction = ["engine1", "endGame"]
    imagePersonTalking = [panda_head, panda_head, panda_head]
    
    //* display dialogue
    if (lastTalkPnj) {
        lastTalkPnj = false
        displayDialogue = true
        interact()
    }
}