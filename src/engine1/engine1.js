function startEngine1(){
    // drawMapEngine1()
    drawEngine1()
    Move()
}


function drawEngine1(){

    // draw map
    mustAddMapAtWorlds();


    let IsDraw = false
    for (let loopLayer = 0; loopLayer < 5; loopLayer++) {
        
        ArrayWorldDisplay.forEach((elm, index)=>{
            
            if (elm.layers[loopLayer]) {

                let indexElm = findIndexValueIn2dArray(world1.World,elm.name);
                let indexPlayerInWorld = findIndexOfPositionIn2dArray(xPlayer,yPlayer,world1.World,sideCarrousel * nbRow , sideCarrousel * nbColumn, xStartWorld1,yStartWorld1,"PlayerInWorld")
                //x,y,w,h,array
        
                
                drawingGrid(xStartWorld1 + sideCarrousel  * nbRow * indexElm[1] ,yStartWorld1 + sideCarrousel  * nbColumn * indexElm[0] ,sideCarrousel,sideCarrousel, elm.layers[loopLayer]);
                

                // console.log(ArrayWorldDisplay[ArrayWorldDisplay.length - 1])
                if ( loopLayer == 1 && index == ArrayWorldDisplay.length - 1) {
                    pnjManager()
                    drawPlayer()
                }
                
                // draw collision
                if (elm.collision && drawCollision) {
                    drawingCollision(xStartWorld1 + sideCarrousel  * nbRow * indexElm[1] ,yStartWorld1 + sideCarrousel  * nbColumn * indexElm[0] ,sideCarrousel,sideCarrousel,elm.collision);
                    IsDraw = true
                }

            }
            
        });


    }

    

    

    //Cam
    fill(255,255,20,0)
    rect(Xcam,Ycam,Wcam,Hcam)



}



function isEqual(tableau1, tableau2) {
    if (tableau1.length !== tableau2.length) return false
  
    return tableau1.every((value, index) => value === tableau2[index])
  }