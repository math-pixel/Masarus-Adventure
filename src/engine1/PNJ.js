
function createPNJ(){  

    allPnj.forEach((currentPnj) => {

        switch(currentPnj.name){
            case "MASARU_S_FATHER":
                currentPnj.width = sideCarrousel
                currentPnj.skin = pnjTileMasaruFather
                currentPnj.headDialogue = [
                    [ masaruFather_head ,
                         masaruFather_head,
                           masaru_head,
                            masaru_head,
                             masaruFather_head ,
                              masaruFather_head,
                               "", 
                               masaru_head, masaru_head ],
                               [masaru_head,  masaruFather_head, masaruFather_head, masaruFather_head]
                            ]
                currentPnj.headAlreadyTalk = [[masaruFather_head]]
                break;

            case "PNJ_QUEST_1":
                currentPnj.width = sideCarrousel
                currentPnj.skin = pandaTileSet
                currentPnj.headDialogue = [[panda_head , panda_head, panda_head], [panda_head , panda_head, panda_head,panda_head, "", "" , panda_head , panda_head, panda_head,panda_head]]
                currentPnj.headAlreadyTalk = [[panda_head]]
                break;

            case "PNJ_QUEST_2":
                currentPnj.width = sideCarrousel
                currentPnj.skin = deerTileSet
                currentPnj.headDialogue = [
                    [head_deer , head_deer], 
                    [
                        head_deer, 
                        head_deer, 
                        head_deer,
                        masaru_head, 
                        head_deer, 
                        head_deer, 
                        head_deer,
                        head_deer,
                        head_deer,
                        head_deer
                    ],
                    [
                        head_deer,
                        head_deer,
                        head_deer,
                        head_deer,
                        head_deer,
                        masaru_head,
                        masaru_head,
                        head_deer
                    ]
                ]
                currentPnj.headAlreadyTalk = [[head_deer],[head_deer]]
                break;

            case "PNJ_QUEST_Mountain":
                currentPnj.width = sideCarrousel
                currentPnj.skin = leopardTileSet
                currentPnj.headDialogue = [
                    [head_leopard , 
                    head_leopard,
                    masaru_head,
                    head_leopard,
                    head_leopard,
                    head_leopard,
                    head_leopard,
                    head_leopard,
                    masaru_head,
                    masaru_head
                ]
                ]
                break;
            case "PNJ_QUEST_END_1":
                currentPnj.width = sideCarrousel
                currentPnj.skin = leopardTileSet
                currentPnj.headDialogue = []
                break
            case "PNJ_QUEST_END_2":
                currentPnj.width = sideCarrousel
                currentPnj.skin = pandaTileSet
                currentPnj.headDialogue = []
                break
        }
    })

}

function pnjManager(){

    allPnj.forEach((pnj) => {

        if (pnj.displayAtQuest == 0 || quests[pnj.displayAtQuest].isFinish) {

            let index_Direction = 1;

            //! set direction and movement
            //? if the pnj is not in interaction with player
            if (pnj.canMove) {

                switch(pnj.direction){
                    case "right":

                        //! si la position du pnj ne doit pas etre en mouvement
                        if (pnj.distanceToTravel > 0) {

                            pnj.actualDistance += 1 * pnj.speed;
                            index_Direction = 1;
                            if (pnj.actualDistance >= pnj.distanceToTravel) {
                                pnj.direction = "left"
                            }

                        }else{
                            index_Direction = 0
                        }

                        break;
                    case "left":

                        //! si la position du pnj ne doit pas etre en mouvement
                        if (pnj.distanceToTravel > 0) {

                            pnj.actualDistance -= 1 * pnj.speed;
                            index_Direction = 3;
                            if (pnj.actualDistance <= 0) {
                                pnj.direction = "right"
                            }

                        }else{
                            index_Direction = 2
                        }

                        break;
                    case "bottom":

                    if (pnj.distanceToTravel > 0) {

                        // pnj.actualDistance += 1 * pnj.speed;
                        // index_Direction = 1;
                        // if (pnj.actualDistance >= pnj.distanceToTravel) {
                        //     pnj.direction = "left"
                        // }

                    }else{
                        index_Direction = 4
                    }

                        break;
                    case "top":
                        if (pnj.distanceToTravel > 0) {

                            // pnj.actualDistance += 1 * pnj.speed;
                            // index_Direction = 1;
                            // if (pnj.actualDistance >= pnj.distanceToTravel) {
                            //     pnj.direction = "left"
                            // }

                        }else{
                            index_Direction = 5
                        }
                        break;
                    case "leftForEnding":
                        if (pnj.distanceToTravel > 0) {

                            pnj.actualDistance -= 1 * pnj.speed;
                            index_Direction = 3;
                            // console.log(pnj.actualDistance >= pnj.distanceToTravel, pnj.actualDistance, pnj.distanceToTravel)
                            if (pnj.actualDistance <= -pnj.distanceToTravel) {
                                pnj.direction = "leftForEnding"
                                pnj.distanceToTravel = 0
                            }

                        }else{
                            index_Direction = 2
                        }
                        break;
                    default:
                        index_Direction = 0
                }

            }else{
                //! set direction to player

                //! when player in on the same line of pnj
                if (yStartWorld1 + pnj.yStart - (sideCarrousel / 2)  < yPlayer && yStartWorld1 + pnj.yStart + (sideCarrousel / 2) > yPlayer) {

                    if (xStartWorld1 + pnj.xStart + pnj.actualDistance > xPlayer) {
                        index_Direction = 2

                        //? reset frame for bug draw
                        // pnj.currentFrame = 0;
                    }else if (xStartWorld1 + pnj.xStart + pnj.actualDistance < xPlayer){
                        index_Direction = 0

                        //? reset frame for bug draw
                        // pnj.currentFrame = 0;
                    }else{
                        index_Direction = 4

                        //? reset frame for bug draw
                        // pnj.currentFrame = 0;
                    }
                }else{

                    //! player out of line pnj
                    //?pnj is above player 
                    if (yStartWorld1 + pnj.yStart < yPlayer) {
                        index_Direction = 4
                    }else{
                        index_Direction = 5
                    }
                }

            

            }

            //! animation pnj
            animatePNJ(pnj, index_Direction)
            // console.log(pnj.id ,pnj.currentFrame )

            
            //? create pnj rect and boncing rect
            let pnjRect = [xStartWorld1 + pnj.xStart + pnj.actualDistance, yStartWorld1 + pnj.yStart, pnj.width, pnj.width];
            let newPnjRect = createNewRect( xStartWorld1 + pnj.xStart + pnj.actualDistance, yStartWorld1 + pnj.yStart, pnj.width, pnj.width, 3 );
            // console.log(newPnjRect)

            // draw pnj collision boucing
            if (debugMode) {
                fill(255,255,0,30)
                rect(newPnjRect[0],newPnjRect[1],newPnjRect[2],newPnjRect[3]);
                fill(255,255,0)
                rect(xStartWorld1 + pnj.xStart + pnj.actualDistance, yStartWorld1 + pnj.yStart, sideCarrousel,sideCarrousel)
            }

            //! si player is on radius interaction box 
            if(rectIsInRect([xPlayer,yPlayer, sideCarrousel, sideCarrousel], newPnjRect)){


                //? set up layer player for layer bug fix
                playerLayer = layerCollision

                //? draw exclamation point if not in dialogue
                if (!displayDialogue) {

                    if (!isEndOfTheGame) {
                        image(exclamationPoint[pnj.currentFrameInteraction], xStartWorld1 + pnj.xStart + pnj.actualDistance + sideCarrousel / 4, yStartWorld1 + pnj.yStart - sideCarrousel / 2, sideCarrousel / 2,sideCarrousel / 2)
                        //? add frame of exclamation point
                        addFrameInteraction(pnj)
                    }
                }


                //? remove the posssibility of move of pnj
                pnj.canMove = false

                setUpDialoguePnj(pnj)

                // verification if the player is in contact with current pnj
                pnj.canInteractVerification = true

                //! pnj is in front of player ( for draw player above or below pnj )
                if (pnj.canInteractVerification) {
                    // console.log(pnj.yStart < yPlayer)
                    if (yStartWorld1 + pnj.yStart < yPlayer) {
                        PNJinFrontOfPlayer = false;
                    }else{
                        PNJinFrontOfPlayer = true;
                    }
                }


            }else{
                pnj.canMove = true
                if (pnj.canInteractVerification) {
                    pnj.canInteractVerification = false
                    canInteract = false

                    PNJinFrontOfPlayer = false;
                }
            }


            //! if player is in collision with pnj
            if(rectIsInRect([xPlayer,yPlayer, sideCarrousel, sideCarrousel], pnjRect)){
                playerNotCollisionPNJ = false
            }else{
                playerNotCollisionPNJ = true
            }
            

            //! draw png 
            if (pnj.skin[index_Direction][pnj.currentFrame]) {
                image(pnj.skin[index_Direction][pnj.currentFrame], xStartWorld1 + pnj.xStart + pnj.actualDistance, yStartWorld1 + pnj.yStart, sideCarrousel,sideCarrousel)
            }
            // else{
            //     image(pnj.skin[0][0], xStartWorld1 + pnj.xStart + pnj.actualDistance, yStartWorld1 + pnj.yStart, sideCarrousel,sideCarrousel)
            // }
            
        }
    })
}


//animate exclamation point
function addFrameInteraction(pnj){
    if (pnj.frameRatePNJ % 30 === 0) {
        if (pnj.currentFrameInteraction >= exclamationPoint.length - 1) {
            pnj.currentFrameInteraction = 0;
            // console.log("yey")
        }else{
            pnj.currentFrameInteraction += 1;
            
        }
        
    }
}


function animatePNJ(pnj,index_Direction){

    if (pnj.frameRatePNJ % pnj.ratioFrameRate === 0) {

        //! add frame at pnj
        if( pnj.currentFrame >= pnj.skin[index_Direction].length -1){
            pnj.currentFrame = 0;
        }else{
            pnj.currentFrame += 1;
        }

    }

    //! counter of frame for individual pnj
    pnj.frameRatePNJ += 1;
}



function setUpDialoguePnj(pnj){
    //! set up dialogue system variable
    canInteract = true

    //! ### set up pnj masarus father
    if (pnj.name === "MASARU_S_FATHER" && !quests[10].isFinish) {

        

        //*quest 1
        // console.log("MASARU_S_FATHER")
        //? not already talk 
        if (!pnj.alreadyTalk) {
            textDialogue = pnj.dialogue[0];
            endAction = pnj.actionDialogue[0];
            imagePersonTalking = pnj.headDialogue[0] 

            if (pnj.dialogue[0].length - 1 == indexInDialogue) {
                pnj.alreadyTalk = true
            }

        }else{

            if (indexInDialogue == 0) {
                textDialogue = pnj.dialogueAlreadyTalk[0];
                endAction = pnj.actionAlreadyTalk[0];
                imagePersonTalking = pnj.headAlreadyTalk[0]
            }
            
        }


        if (quests[10].isFinish == false && quests[9].isFinish == true) {
            if (!pnj.alreadyTalk) {
                textDialogue = pnj.dialogue[1];
                endAction = pnj.actionDialogue[1];
                imagePersonTalking = pnj.headDialogue[1]

                //* set up pnj already talk
                if (pnj.dialogue[1].length - 1 == indexInDialogue) {
                    pnj.alreadyTalk = true
                }

            }else{

                if (indexInDialogue == 0) {
                    textDialogue = pnj.dialogueAlreadyTalk[1];
                    endAction = pnj.actionAlreadyTalk[1];
                    imagePersonTalking = pnj.headAlreadyTalk[1]
                }
                
            }
        }
        
        
    }



    //! ### set up pnj 2 ( parchemin )
    if (pnj.name === "PNJ_QUEST_1") {

        //*quest 2 ( lettre dechifrer )
        if (quests[1].isFinish) {

            //? not already talk 
            if (!pnj.alreadyTalk) {
                textDialogue = pnj.dialogue[1];
                endAction = pnj.actionDialogue[1];
                imagePersonTalking = pnj.headDialogue[1]

                //* set up pnj already talk
                if (pnj.dialogue[1].length - 1 == indexInDialogue) {
    
                    pnj.alreadyTalk = true
                }

            }else{

                if (indexInDialogue == 0) {
                    textDialogue = pnj.dialogueAlreadyTalk[0];
                    endAction = pnj.actionAlreadyTalk[0];
                    imagePersonTalking = pnj.headAlreadyTalk[0]
                }
                
            }
        }else{

            //* default text

            textDialogue = pnj.dialogue[0];
            endAction = pnj.actionDialogue[0];
            imagePersonTalking = pnj.headDialogue[0]

        }
        
    }



    //! ### set up pnj 3 ( eventail )
    if (pnj.name === "PNJ_QUEST_2") {

        //*quest 3 ( corde 1 recuperer )
        if (quests[2].isFinish) {

            //? not already talk 
            if (!pnj.alreadyTalk) {
                textDialogue = pnj.dialogue[1];
                endAction = pnj.actionDialogue[1];
                imagePersonTalking = pnj.headDialogue[1]


                // console.log(pnj.dialogue[1].length - 1 , indexInDialogue)
                //? already talk
                if (pnj.dialogue[1].length - 1 == indexInDialogue) {
                    pnj.alreadyTalk = true
                }

            }else{

                if (indexInDialogue == 0) {
                    textDialogue = pnj.dialogueAlreadyTalk[0];
                    endAction = pnj.actionAlreadyTalk[0];
                    imagePersonTalking = pnj.headAlreadyTalk[0];

                    // console.log("a", textDialogue, endAction, imagePersonTalking)
                }
                
            }

            //* get eventail in inventory
            if (quests[4].isFinish) {
                //? not already talk 
                if (!pnj.alreadyTalk) {
                    textDialogue = pnj.dialogue[2];
                    endAction = pnj.actionDialogue[2];
                    imagePersonTalking = pnj.headDialogue[2]

                    //? already talk
                    if (pnj.dialogue[2].length - 1 == indexInDialogue) {
                        pnj.alreadyTalk = true
                    }

                }else{

                    if (indexInDialogue == 0) {
                        textDialogue = pnj.dialogueAlreadyTalk[1];
                        endAction = pnj.actionAlreadyTalk[1];
                        imagePersonTalking = pnj.headAlreadyTalk[1]

                        // console.log("b", textDialogue, endAction, imagePersonTalking)
                    }
                    
                }
            }



        }else{

            //* default text
            textDialogue = pnj.dialogue[0];
            endAction = pnj.actionDialogue[0];
            imagePersonTalking = pnj.headDialogue[0]

        }
        
    }


    //! ### set up pnj montagne
    if (pnj.name === "PNJ_QUEST_Mountain") {

        //*quest 2 ( lettre dechifrer )
        if (quests[6].isFinish) {

            //? not already talk 
            if (!pnj.alreadyTalk) {
                textDialogue = pnj.dialogue[0];
                endAction = pnj.actionDialogue[0];
                imagePersonTalking = pnj.headDialogue[0]

                //* quest finish to talk pnj 2
                quests[7].isFinish = true

                //? already talk
                if (pnj.dialogue[0].length - 1 == indexInDialogue) {
                    pnj.alreadyTalk = true
                }

            }else{

                if (indexInDialogue == 0) {
                    textDialogue = pnj.dialogueAlreadyTalk[0];
                    endAction = pnj.actionAlreadyTalk[0];
                    imagePersonTalking = [panda_head]
                }
                
            }
        }else{

            //* default text

            textDialogue = ["non"];
            endAction = ["engine1"];
            imagePersonTalking = [panda_head]

        }
        
    }



    
}