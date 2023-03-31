
function interactionWithMap(typeBlock){
    console.log(typeBlock)

    switch(typeBlock){
        case 5:
            console.log("yey")
            break;
    }
}

function drawinteraction(x,y,w,h, array){
    for (let row = 0; row < array[0].length; row++) {
        for (let column = 0; column < array.length; column++) {
            
            // image(allTiles[array[column][row]],x+w*row,y+h*column,w,h);
            //! test if its an interaction block
            if (array[column][row] != blockToNotCollision) {

                let newRectInteraction = createNewRect(x+w*row,y+h*column,w,h,2);

                //! test if it's in collision with player
                if (rectIsInRect([xPlayer, yPlayer, sideCarrousel, sideCarrousel], newRectInteraction)) {

                    //! draw exclamation point
                    image(exclamationPoint[0], x+w*row + sideCarrousel / 4, y+h*column - sideCarrousel / 2, sideCarrousel / 2,sideCarrousel / 2);

                    if (keyInteractionIsPressed) {
                        console.log("interaction")
                        interactionWithMap(array[column][row])

                    }
                }

                if (drawCollision) {
                    fill(255,0,0, 80)
                    rect(newRectInteraction[0],newRectInteraction[1],newRectInteraction[2],newRectInteraction[3]);          
                }
            }
        }
    }
}