function questManager(){

    //! display none parchemin ( 3 ) 
    Maps["tilemap_20"].layers[layerInteraction][3][7] = 0

    //! display none eventail
    Maps["tilemap_20"].layers[layerInteraction][5][7] = 0


    //! display none coffre
    Maps["tilemap_20"].layers[layerInteraction][10][7] = 0

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

    //* afficher coffre in map 
    if(quests[5].isFinish && !quests[6].isFinish){
        //! affichage coffre
        Maps["tilemap_20"].layers[layerInteraction][10][7] = indexTilecoffre


        //! set up engine 2 to coffre
        tilesetEngine2 = chestTiles
        mapRandomSet = false
        imageBackgroundEng2 = imageBackgroundEng2Coffre
    }

        

}




function dialogueQuest8(){
    //? prepare the quest num : 7
    setTimeout(() => {

        //* set up dialogue
        canInteract = true
        textDialogue = [
            "Bonjour Masaru.",
            "Tu ne peux pas me voir mais je suis là pour t’aider à remplir ta quête.",
            "Je sais qu’il le reste une corde à trouver.",
            "Et je sais où elle se trouve.",
            "Les anciens m’ont envoyés pour te tester.",
            "Pour savoir si tu es dignes de ce pouvoir.",
            "J’ai une énigme pour toi. Si tu la résous, je t’indiquerai où se trouve la corde.",
            
            "Je suis prêt à t’écouter",
        
            "Énigme",
        
            "Les anciens avaient raison",
            "Nous pouvons te faire confiance.",
            "Va trouver la dernière corde, elle se trouve au sommet de la montagne.",
            "Cours la retrouver."
        ];
        endAction = ["engine1"];
        imagePersonTalking = [
            playerTileSet[1][0],
            playerTileSet[1][0],
            playerTileSet[1][0],
            playerTileSet[1][0],
            playerTileSet[1][0],
            playerTileSet[1][0],
            playerTileSet[1][0],
            masaru_head,
            "",
            playerTileSet[1][0],
            playerTileSet[1][0],
            playerTileSet[1][0],
            playerTileSet[1][0],
        ]
        
        //* display dialogue
        displayDialogue = true
        interact()
        
    }, "10000");
}