function startEngine1(){

    //! draw map
    drawEngine1()

    //! move map and player
    if (canMove) {
        Move()
    }

    //! draw inventory
    if (!displayDialogue) {
        drawInventory(1000 / 2 - globalSideInventoryX / 2,  578 -  ( globalSideInventoryY + 10 ) , sideCarrousel)
    }

    //! draw dialogue
    if (displayDialogue) {
        startEngineDialogue();
    }
    
    //! draw shamisen
    if(displayShamisen){
        currentSpriteShamisen = 1
        image(spriteSheetShamisen[currentSpriteShamisen], 1000 - 130 - 10, 0 + 10, 130, 153)
    }

    //! setting button
    image(setting_button_inGame[index_setting_button_inGame], 20,20,48,48 )
    actionOnText([20,20 ,48,48], "pauseMenu", setting_button_inGame[2])


    //! draw note shamisen quest 2
    drawNote()

    //! draw current quest
    if(!displayDialogue){
        drawQuest()
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
                if ( loopLayer == playerLayer && index == ArrayWorldDisplay.length - 1) {
                    if (PNJinFrontOfPlayer) {
                        drawPlayer()
                        pnjManager()
                    }else{
                        pnjManager()
                        drawPlayer()
                    }

                }

                if (loopLayer === 3) {
                    // pnjManager()
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

    let rectBoncing;

    //! display empty box
    if(questBoxIsEmpty){
        image(quest_box_1, 1000 - 130 - 10 , 183, 130, 65)
        rectBoncing = [1000 - 130 - 10 , 183, 130, 65]
    }else{
        image(quest_box_2, 1000 - 130 - 10 , 183, 130, 117)
        rectBoncing = [1000 - 130 - 10 , 183, 130, 117]
        fill("#000000");
        textAlign(CENTER);
        textSize(20);
        textLeading(15);
        // rect(1000 - 125 , 220 , 100 , 100)
        text(currentQuestDisplay, 1000 - 122 , 220 , 100 , 100)
    }

    actionOnText(rectBoncing, "reverseQuestBox", "")
}