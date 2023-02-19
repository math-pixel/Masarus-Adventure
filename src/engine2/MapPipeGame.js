function drawingGridPipeGame(x,y,w,h,array){

    for (let row = 0; row < array[0].length; row++) {
        for (let column = 0; column < array.length; column++) {

            switch(array[column][row].tile){
                case 0: {
                    currentDrawingImage = alphaImg;
                    break;
                }case 1:{
                    currentDrawingImage = grass_main;
                    break;
                }case 2:{
                    currentDrawingImage = path_corner_bottomLeft;
                    break;
                }case 3:{
                    currentDrawingImage = path_corner_bottomRight;
                    break;
                }case 4:{
                    currentDrawingImage = path_corner_topLeft;
                    break;
                }case 5:{
                    currentDrawingImage = path_corner_topRight;
                    break;
                }case 6:{
                    currentDrawingImage = path_horizontal;
                    break;
                }case 7:{
                    currentDrawingImage = path_vertical;
                    break;
                }case 8:{
                    currentDrawingImage = fence_horizontal;
                    break;
                }case 9:{
                    currentDrawingImage = river_corner_bottomLeft;
                    break;
                }case 10:{
                    currentDrawingImage = river_corner_bottomRight;
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
        
        if (MapPipeGame.Map.layers[currentIndex[1]][currentIndex[0]].rotation === 270) {
            MapPipeGame.Map.layers[currentIndex[1]][currentIndex[0]].rotation = 0;
        }else{
            MapPipeGame.Map.layers[currentIndex[1]][currentIndex[0]].rotation += 90;
        }
    
    }
}