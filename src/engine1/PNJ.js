
let allPnj = []

function createPNJ(id, xstartPNJ, ystartPNJ, distanceToTravel , skin = [], ratioFrameRate /* 2D array [dir][frame]*/, speed = 1){
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
        "skin": skin
    }

    allPnj.push(pnj)

}

function pnjManager(){

    allPnj.forEach((pnj) => {
        let index_Direction = 0;

        // set direction and movement
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
        // console.log(pnj.id ,pnj.currentFrame )

        

        let pnjRect = createNewRect( xStartWorld1 + pnj.xStart + pnj.actualDistance, yStartWorld1 + pnj.yStart, pnj.width, pnj.width, 3 );
        let newPnjRect = pnjRect;

        if (drawCollision) {
            fill(255,255,0,30)
            rect(pnjRect[0],pnjRect[1],pnjRect[2],pnjRect[3]);
        }

        let player = [xPlayer,yPlayer, sideCarrousel, sideCarrousel];

        if(rectIsInRect(newPnjRect, player)){
            pnj.canMove = false
        }else{
            pnj.canMove = true
        }
        
        // fill(255,255,0)
        // rect(xStartWorld1 + pnj.xStart + pnj.actualDistance, yStartWorld1 + pnj.yStart, sideCarrousel,sideCarrousel)
        image(pnj.skin[index_Direction][pnj.currentFrame], xStartWorld1 + pnj.xStart + pnj.actualDistance, yStartWorld1 + pnj.yStart, sideCarrousel,sideCarrousel)
    })

}