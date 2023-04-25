function questManager(){

    //! display none parchemin ( 3 ) 
    Maps["tilemap_20"].layers[layerInteraction][3][7] = 0

    //! display none eventail
    Maps["tilemap_20"].layers[layerInteraction][5][7] = 0

    //! display none coffre
    Maps["tilemap_20"].layers[layerInteraction][10][7] = 0

    //! display none last rope
    Maps[tilemapRope].layers[layerInteraction][coordLastRope[1]][coordLastRope[0]] = 0

    //* talk to masarus father
    if(quests[0].isFinish && !quests[1].isFinish){
        //! affichage parchemin
        Maps["tilemap_20"].layers[layerInteraction][3][7] = indexTileParchemin
    }


    //* find evantail and quest parchemin is ended
    if(quests[3].isFinish && !quests[4].isFinish){
        //! affichage eventaille
        Maps["tilemap_20"].layers[layerInteraction][5][7] = indexTileeventaille

    }
    
    if (quests[4].isFinish) {
        allPnj[2].alreadyTalk = false
    }

    //* afficher coffre in map 
    if(quests[5].isFinish && !quests[6].isFinish){
        //! affichage coffre
        Maps["tilemap_20"].layers[layerInteraction][10][7] = indexTilecoffre


        //! set up engine 2 to coffre
        tilesetEngine2 = chestTiles
        mapRandomSet = false
        imageBackgroundEng2 = imageBackgroundEng2Coffre
    }

    //display last rope
    if (quests[8].isFinish) {
        Maps[tilemapRope].layers[layerInteraction][coordLastRope[1]][coordLastRope[0]] = indexTileRope
    }

    if (quests[9].isFinish == true) {

        allPnj[0].alreadyTalk= false

    }

    if (quests[10].isFinish == true) {
        //TODO remove mouvement for player
    }

    if (quests[11].isFinish == true) {
        alert("bravo ta fini le jeux")
        /*
        - animation note multi color
        - tilemap au alentour change
  10 pnj qui start hors de la map $
  dialogue 3 / 4 pnj qui remercie masaru
  fondue couleur de fond vers credit de fin
        */
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