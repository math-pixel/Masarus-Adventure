
function interactionWithMap(typeBlock, array, column,row){
    // console.log(typeBlock)

    switch(typeBlock){
        // parchemin
        case indexTileParchemin:
            if (canAddToInventory({"name" : "parcheminEncode" , "image": allTiles[26]})) {
                addToInventory({"name" : "parcheminEncode" , "image": allTiles[26]})
                array[column][row] = 0

                quests[1].beDisplayed = true
                currentQuestDisplay = setCurrentQuestDisplay()
            }
            break;

        // eventail
        case indexTileeventaille:

            if (canAddToInventory({"name" : "eventail" , "image": allTiles[28]})) {
                addToInventory({"name" : "eventail" , "image": allTiles[28]})
                array[column][row] = 0
                quests[4].isFinish = true
                questManager()
            }
            break;
        
        // coffre
        case indexTilecoffre:

            engine = "engine2"

        break;

        // pierre
        case indexTileRoche:

            canInteract = true
            textDialogue = [
                "je pense que je n'arriverait pas a detruire ces pierre a la main"
            ];
            endAction = ["engine1"];
            imagePersonTalking = [
                masaru_head
            ]
            
            //* display dialogue
            displayDialogue = true
            interact()

        break;

        // corde
        case indexTileRope:

            quests[9].isFinish = true
            questManager()

            //? remome rope from interaction layer
            Maps[tilemapRope].layers[layerInteraction][coordLastRope[1]][coordLastRope[0]] = blockToNotCollision

            canInteract = true
            textDialogue = [
                "vous avez obtenu une corde",
                "je dois vite rentrer au village pour l'annocer a mon pere"
            ];
            endAction = ["engine1", "addRopeToShamisen"];
            imagePersonTalking = [
                "",
                masaru_head
            ]
            
            //* display dialogue
            displayDialogue = true
            interact()

        break;

    }
}

function drawinteraction(x,y,w,h, array){
    for (let row = 0; row < array[0].length; row++) {
        for (let column = 0; column < array.length; column++) {
            
            // image(allTiles[array[column][row]],x+w*row,y+h*column,w,h);
            //! test if its an interaction block
            if (array[column][row] != blockToNotCollision) {

                let newRectInteraction = createNewRect(x+w*row,y+h*column,w,h,2);

                //! test if it's in collision with player
                if (rectIsInRect([xPlayer, yPlayer, sideCarrousel, sideCarrousel], newRectInteraction)) {

                    //! draw exclamation point
                    image(exclamationPoint[0], x+w*row + sideCarrousel / 4, y+h*column - sideCarrousel / 2, sideCarrousel / 2,sideCarrousel / 2);

                    //! set up event for quest system
                    //? tile Rock
                    if (array[column][row] == indexTileRoche) {
                        playerNearToTheRock = true
                    }else{
                        playerNearToTheRock = false
                    }

                    //? tile eboulement
                    //? tile Rock
                    if (array[column][row] == indexLandslide) {
                        playerNearToLandslide = true
                    }else{
                        playerNearToLandslide = false
                    }

                    if (keyInteractionIsPressed) {
                        console.log("interaction")
                        interactionWithMap(array[column][row], array, column, row)

                    }
                }

                if (debugMode) {
                    fill(255,0,0, 80)
                    rect(newRectInteraction[0],newRectInteraction[1],newRectInteraction[2],newRectInteraction[3]);          
                }
            }
        }
    }
}