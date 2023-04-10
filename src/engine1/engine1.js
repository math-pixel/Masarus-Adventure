function startEngine1(){

    //! draw map
    drawEngine1()

    //! move map and player
    if (canMove) {
        Move()
    }

    //! draw inventory
    drawInventory(1000 / 2 - globalSideInventoryX / 2,  578 -  ( globalSideInventoryY + 10 ) ,sideCarrousel)

    //! draw dialogue
    if (displayDialogue) {
        startEngineDialogue();
    }
    

    if(displayShamisen){
        image(spriteSheetShamisen[currentSpriteShamisen], 1000 - 130 , 0 , 130, 250)
    }
}


function drawEngine1(){

    //! draw map
    mustAddMapAtWorlds();
    for (let loopLayer = 0; loopLayer < 5; loopLayer++) {
        
        ArrayWorldDisplay.forEach((elm, index)=>{

            //! get index current map in world
            let indexElm = findIndexValueIn2dArray(world1.World,elm.name);
            
            if (elm.layers[loopLayer]) {


                // let indexPlayerInWorld = findIndexOfPositionIn2dArray(xPlayer,yPlayer,world1.World,sideCarrousel * nbRow , sideCarrousel * nbColumn, xStartWorld1,yStartWorld1,"PlayerInWorld")

        
                //!draw map
                drawingGrid(xStartWorld1 + sideCarrousel  * nbRow * indexElm[1] ,yStartWorld1 + sideCarrousel  * nbColumn * indexElm[0] ,sideCarrousel,sideCarrousel, elm.layers[loopLayer]);


                //!do interaction
                if (loopLayer == layerInteraction) {
                    drawinteraction(xStartWorld1 + sideCarrousel  * nbRow * indexElm[1] ,yStartWorld1 + sideCarrousel  * nbColumn * indexElm[0] ,sideCarrousel,sideCarrousel, elm.layers[loopLayer] )
                }

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
                
            }

            //! draw collision
            if (loopLayer == layerCollision && debugMode) {
                drawingCollision(xStartWorld1 + sideCarrousel  * nbRow * indexElm[1] ,yStartWorld1 + sideCarrousel  * nbColumn * indexElm[0] ,sideCarrousel,sideCarrousel,elm.layers[loopLayer]);
                drawDebugMap(elm , indexElm)
            }
            
        });


    }

    

    //Cam
    fill(255,255,20,0)
    rect(Xcam,Ycam,Wcam,Hcam)



}