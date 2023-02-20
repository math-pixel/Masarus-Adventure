function drawingGridPipeGame(x,y,w,h,array){

    for (let row = 0; row < array[0].length; row++) {
        for (let column = 0; column < array.length; column++) {

            switch(array[column][row].tile){
                case 0:{
                    currentDrawingImage = pipe_start;
                    break;
                }case 1:{
                    currentDrawingImage = pipe_corner;
                    break;
                }case 2:{
                    currentDrawingImage = pipe_straight;
                    break;
                }
                case 3:{
                    currentDrawingImage = pipe_tri;
                    break;
                }case 4:{
                    currentDrawingImage = pipe_end;
                    break;
                }
            }   

            angleMode(DEGREES);
            push()
            translate(x+w*row,y+h*column);
            let a = atan2(mouseY - height / 2, mouseX - width / 2);
            rotate(array[column][row].rotation);
            image(currentDrawingImage, -w / 2, -h / 2,w,h); 
            pop() 
        }
    }

    const maxWidht = w * array.length;
    const maxHeight = w * array[0].length;
    coordMap = [x,y,x + maxWidht , y + maxHeight];// coord de la map rect[x1,y1,x2,y2]
}

function drawMapEngine2(array){

    //x,y,w,h,array
    drawingGridPipeGame(xStartWorld2 ,yStartWorld2 ,sideCarrousel,sideCarrousel,array);
}


function mousePressed() {
    let currentIndex;
    if (pointIsInside(mouseX,mouseY, [xStartWorld2 - sideCarrousel / 2, yStartWorld2 - sideCarrousel / 2 , xStartWorld2 + sideCarrousel * MapPipeGame.Map.layers[0].length, yStartWorld2 + sideCarrousel * MapPipeGame.Map.layers.length])) {
        currentIndex = findIndexOfPositionIn2dArray(mouseX,mouseY,MapPipeGame.Map.layers,sideCarrousel,sideCarrousel, xStartWorld2 -sideCarrousel / 2 ,yStartWorld2 -sideCarrousel / 2, "pipeGame")
        
        if (MapPipeGame.Map.layers[currentIndex[1]][currentIndex[0]].tile !== 0 || MapPipeGame.Map.layers[currentIndex[1]][currentIndex[0]].tile !== 4) { // != of start and end tile
            if (MapPipeGame.Map.layers[currentIndex[1]][currentIndex[0]].rotation === 270) {
                MapPipeGame.Map.layers[currentIndex[1]][currentIndex[0]].rotation = 0;
            }else{
                MapPipeGame.Map.layers[currentIndex[1]][currentIndex[0]].rotation += 90;
            }
        }

    }
}