function startEngine1(){
    // drawMapEngine1()
    drawEngine1()
    Move()
}


function drawEngine1(){

    //! draw map
    mustAddMapAtWorlds();
    for (let loopLayer = 0; loopLayer < 5; loopLayer++) {
        
        ArrayWorldDisplay.forEach((elm, index)=>{
            
            if (elm.layers[loopLayer]) {

                let indexElm = findIndexValueIn2dArray(world1.World,elm.name);
                // console.log("a" , world1.World)
                let indexPlayerInWorld = findIndexOfPositionIn2dArray(xPlayer,yPlayer,world1.World,sideCarrousel * nbRow , sideCarrousel * nbColumn, xStartWorld1,yStartWorld1,"PlayerInWorld")
                //x,y,w,h,array
        
                
                drawingGrid(xStartWorld1 + sideCarrousel  * nbRow * indexElm[1] ,yStartWorld1 + sideCarrousel  * nbColumn * indexElm[0] ,sideCarrousel,sideCarrousel, elm.layers[loopLayer]);


                //! draw pnj and player
                if ( loopLayer == playerLayer && index == ArrayWorldDisplay.length - 1) {
                    if (PNJinFrontOfPlayer) {
                        drawPlayer()
                        pnjManager()
                    }else{
                        pnjManager()
                        drawPlayer()
                    }

                }
                
                //! draw collision
                if (elm.collision && drawCollision) {
                    drawingCollision(xStartWorld1 + sideCarrousel  * nbRow * indexElm[1] ,yStartWorld1 + sideCarrousel  * nbColumn * indexElm[0] ,sideCarrousel,sideCarrousel,elm.collision);
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