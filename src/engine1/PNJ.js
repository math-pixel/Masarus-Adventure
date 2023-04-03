
let allPnj = []

function createPNJ(id, xstartPNJ, ystartPNJ, distanceToTravel , skin = [], ratioFrameRate /* 2D array [dir][frame]*/, speed = 1, dialogue = [], actionDialogue = [], headDialogue = []){
    // fill(255,150,0)
    // rect(xStartWorld1 + xstartPNJ + maxTranslate, yStartWorld1 + ystartPNJ, 50,50) 

    let pnj = {
        "id": id,
        "xStart": xstartPNJ,
        "yStart": ystartPNJ,
        "width": sideCarrousel,
        "distanceToTravel": distanceToTravel, 
        "actualDistance": 0,
        "speed": speed,
        "canMove": true,
        "direction": "right",
        "currentFrame": 0,
        "frameRate": 0,
        "ratioFrameRate" : ratioFrameRate,
        "skin": skin,
        "currentFrameInteraction": 0,
        "dialogue" : dialogue,
        "actionDialogue": actionDialogue,
        "canInteractVerification": false,
        "headDialogue" : headDialogue
    }

    allPnj.push(pnj)

}

function pnjManager(){

    allPnj.forEach((pnj) => {
        let index_Direction = 0;

        //! set direction and movement
        if (pnj.canMove) {
            if (pnj.direction === "right") {
                pnj.actualDistance += 1 * pnj.speed;
                index_Direction = 3;
                if (pnj.actualDistance >= pnj.distanceToTravel) {
                    pnj.direction = "reculer"
                }
            }else if(pnj.direction === "reculer"){
                index_Direction = 2;
                pnj.actualDistance -= 1 * pnj.speed
                if (pnj.actualDistance <= 0) {
                    pnj.direction = "right"
                }
            }
        }else{
            index_Direction = 1;
        }

        //! animation pnj
        animatePNJ(pnj, index_Direction)
        // console.log(pnj.id ,pnj.currentFrame )

        
        //? create pnj rect and boncing rect
        let pnjRect = [xStartWorld1 + pnj.xStart + pnj.actualDistance, yStartWorld1 + pnj.yStart, pnj.width, pnj.width];
        let newPnjRect = createNewRect( xStartWorld1 + pnj.xStart + pnj.actualDistance, yStartWorld1 + pnj.yStart, pnj.width, pnj.width, 3 );
        // console.log(newPnjRect)

        // draw pnj collision boucing
        if (drawCollision) {
            fill(255,255,0,30)
            rect(newPnjRect[0],newPnjRect[1],newPnjRect[2],newPnjRect[3]);
            fill(255,255,0)
            rect(xStartWorld1 + pnj.xStart + pnj.actualDistance, yStartWorld1 + pnj.yStart, sideCarrousel,sideCarrousel)
        }

        //! si player is on radius interaction box 
        if(rectIsInRect([xPlayer,yPlayer, sideCarrousel, sideCarrousel], newPnjRect)){


            //? draw exclamation point 
            image(exclamationPoint[pnj.currentFrameInteraction], xStartWorld1 + pnj.xStart + pnj.actualDistance + sideCarrousel / 4, yStartWorld1 + pnj.yStart - sideCarrousel / 2, sideCarrousel / 2,sideCarrousel / 2)
            //? add frame of exclamation point
            addFrameInteraction(pnj)

            //? remove the posssibility of move of pnj
            pnj.canMove = false

            //! set up dialogue system variable
            if (pnj.dialogue[currentAdvancementQuest]) {
                textDialogue = pnj.dialogue[currentAdvancementQuest];
                // imagePersonTalking = masaru_head
                endAction = pnj.actionDialogue[currentAdvancementQuest];
                imagePersonTalking = pnj.headDialogue[currentAdvancementQuest]
            }else{
                textDialogue = pnj.dialogue[pnj.dialogue.length - 1];
                endAction = pnj.actionDialogue[pnj.actionDialogue.length - 1];
                imagePersonTalking = pnj.headDialogue[pnj.headDialogue.length - 1];
            }
            
            canInteract = true

            // verification if the player is in contact with current pnj
            pnj.canInteractVerification = true



            //! pnj is in front of player
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
        
    })

}


//animate exclamation point
function addFrameInteraction(pnj){
    if (pnj.frameRate % 30 === 0) {
        if (pnj.currentFrameInteraction >= exclamationPoint.length - 1) {
            pnj.currentFrameInteraction = 0;
            // console.log("yey")
        }else{
            pnj.currentFrameInteraction += 1;
            
        }
        
    }
}


function animatePNJ(pnj,index_Direction){
    if (pnj.frameRate % pnj.ratioFrameRate === 0) {
        if(index_Direction != 1){//TODO trouver un moyen denlever la condition pour pouvoir faire autre chose que gauche / droite
            if( pnj.currentFrame >= pnj.skin[index_Direction].length -1){
                pnj.currentFrame = 0;
            }else{
                pnj.currentFrame += 1;
            }
        }
    }
    pnj.frameRate += 1;
}