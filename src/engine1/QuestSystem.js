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
    }

        

}