function questManager(){

    //! set u^p variable
    if (!quests[0].isFinish) {
        //! display none parchemin ( 3 ) 
        Maps["tilemap_36"].layers[layerInteraction][1][0] = 0

        //! display none eventail
        Maps["tilemap_65"].layers[layerInteraction][4][6] = 0 

        //! display none coffre
        Maps["tilemap_79"].layers[layerInteraction][4][9] = 0

        //TODO remove
        Maps["tilemap_79"].layers[layerInteraction][6][9] = 0
        Maps["tilemap_79"].layers[layerCollision][6][10] = 77
        Maps["tilemap_79"].layers[layerCollision][6][8] = 79

        //! display none last rope
        Maps[tilemapRope].layers[layerInteraction][coordLastRope[1]][coordLastRope[0]] = indexTileRope

        if (!quests[7].isFinish) {
            
            //! display landslide
            Maps[tilemapLandslide].layers[layerInteraction][coordTheLandslide[1]][coordTheLandslide[0]] = indexLandslide
            Maps[tilemapLandslide].layers[layerCollision][coordTheLandslide[1]][coordTheLandslide[0]] = indexLandslide
    
            //! display landslide2
            Maps[tilemapLandslide].layers[layerInteraction][coordTheLandslide[1]+1][coordTheLandslide[0]] = indexLandslide
            Maps[tilemapLandslide].layers[layerCollision][coordTheLandslide[1]+1][coordTheLandslide[0]] = indexLandslide
        }

        //! set up rock intarctive
        if (!quests[8].isFinish) {
            
            Maps[tilemapTheRock].layers[layerInteraction][coordTheRockInteractive[1]][coordTheRockInteractive[0]] = indexTileRoche
            Maps[tilemapTheRock].layers[layerCollision][coordTheRockInteractive[1]][coordTheRockInteractive[0]] = indexTileRoche
    
            Maps[tilemapTheRock].layers[layerInteraction][coordTheRockInteractive[1]][coordTheRockInteractive[0]+1] = indexTileRoche
            Maps[tilemapTheRock].layers[layerCollision][coordTheRockInteractive[1]][coordTheRockInteractive[0]+1] = indexTileRoche
        }
    }


    //* talk to masarus father
    if(quests[0].isFinish && !quests[1].isFinish){
        //! affichage parchemin
        Maps["tilemap_36"].layers[layerInteraction][1][0] = indexTileParchemin
    }

    if (quests[1].isFinish && !quests[2].isFinish) {
        updateObjectInInventory({"name" : "parcheminEncode" , "image": allTiles[26]},{"name" : "parcheminDecode" , "image": allTiles[27]})
    }


    //* find evantail and quest parchemin is ended
    if(quests[3].isFinish && !quests[4].isFinish){
        //! affichage eventaille
        Maps["tilemap_65"].layers[layerInteraction][4][6] = indexTileeventaille

    }
    
    if (quests[4].isFinish) {
        allPnj[2].alreadyTalk = false
    }

    //* afficher coffre in map 
    if(quests[5].isFinish && !quests[6].isFinish){
        //! affichage coffre
        Maps["tilemap_79"].layers[layerInteraction][4][9] =  indexTilecoffre


        //! set up engine 2 to coffre
        tilesetEngine2 = chestTiles
        mapRandomSet = false
        imageBackgroundEng2 = imageBackgroundEng2Coffre
    }

    if (quests[6].isFinish) {
        Maps["tilemap_36"].layers[layerInteraction][10][7] = 0
    }

    //display last rope
    if (quests[8].isFinish) {
        Maps[tilemapRope].layers[layerInteraction][coordLastRope[1]][coordLastRope[0]] = indexTileRope
    }

    if (quests[9].isFinish == true && !quests[10].isFinish) {

        allPnj[0].alreadyTalk= false

        canMove = false
        vidShamisen.show()
        vidShamisen.play()
        setTimeout(() => {
            vidShamisen.hide()
            canMove = true 
        }, 8000 )
    }

    if (quests[10].isFinish == true) {
        //! remove mouvement for player
        canMove = false

        //! set orientation to bottom
        direction = 1;
        moduloAnimation = 3
    }

    if (quests[11].isFinish == true) {
        canMove = false
        isEndOfTheGame = true
    }
        

    currentQuestDisplay = setCurrentQuestDisplay()
    console.log(currentQuestDisplay)
}




function dialogueQuest7(){
    //? prepare the quest num : 7
    setTimeout(() => {

        //* set up dialogue
        canInteract = true
        textDialogue = [
            "A laideeeeeeeeeeee ....",
            "Ca vient de la montagne !!!",
            "Il faut que j'aille l'aider"
        ];
        endAction = ["engine1", "displayQuest7"];
        imagePersonTalking = [
            playerTileSet[1][0],
            panda_head,
            masaru_head
        ]
        
        //* display dialogue
        displayDialogue = true
        interact()
        
    }, "10000");
}


function setCurrentQuestDisplay(){
    let tempQuest = "none"
    quests.forEach(currentQuest => {
        if (currentQuest.isFinish === false && tempQuest == "none") {

            if(currentQuest.beDisplayed){
                tempQuest = currentQuest.name
                return tempQuest
            }else{
                tempQuest = " "
                return tempQuest
            }
            
        }
    });
    return tempQuest
}