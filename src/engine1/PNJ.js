
let allPnj = []

function createPNJ(id, xstartPNJ, ystartPNJ, distanceToTravel , speed = 1){
    // fill(255,150,0)
    // rect(xStartWorld1 + xstartPNJ + maxTranslate, yStartWorld1 + ystartPNJ, 50,50) 

    let pnj = {
        "id": id,
        "xStart": xstartPNJ,
        "yStart": ystartPNJ,
        "distanceToTravel": distanceToTravel, 
        "actualDistance": 0,
        "speed": speed,
        "state": "avancer"
    }

    allPnj.push(pnj)

}

function pnjManager(){

    allPnj.forEach((pnj) => {

        if (pnj.state === "avancer") {
            pnj.actualDistance += 1 * pnj.speed
            if (pnj.actualDistance >= pnj.distanceToTravel) {
                pnj.state = "reculer"
            }
        }else if(pnj.state === "reculer"){
            pnj.actualDistance -= 1 * pnj.speed
            if (pnj.actualDistance <= 0) {
                pnj.state = "avancer"
            }
        }
        
        fill(255,255,0)
        rect(xStartWorld1 + pnj.xStart + pnj.actualDistance, yStartWorld1 + pnj.yStart, 50,50)
    })

}