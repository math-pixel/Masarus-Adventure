function drawingGridPipeGame(x,y,w,h,array){

    for (let row = 0; row < array[0].length; row++) {
        for (let column = 0; column < array.length; column++) {

            if(array[column][row] === 0){
                fill(color(255, 255, 255));
            }if (array[column][row] === 1) {
                fill(color(255, 0, 0));
            }if(array[column][row] === 2){
                fill(color(0, 255, 0, 50));
            }if (array[column][row] === 3) {
                fill(color(0, 0, 255));
            }if(array[column][row] === 4){
                fill(color(255, 255, 0, 50));
            }if (array[column][row] === 5) {
                fill(color(0, 255, 255));
            }if(array[column][row] === 6){
                fill(color(255, 0, 255, 50));
            }if (array[column][row] === 7) {
                fill(color(50, 50, 0));
            }if (array[column][row] === 8) {
                fill(color(50, 150, 90));
            }
            
            rect(x+w*row,y+h*column,w,h);          
        }
    }

    const maxWidht = w * array.length;
    const maxHeight = w * array[0].length;
    coordMap = [x,y,x + maxWidht , y + maxHeight];// coord de la map rect[x1,y1,x2,y2]
}

function drawMapEngine2(array){


    xStartWorld1 = 0;
    yStartWorld1 = 0;


    //x,y,w,h,array
    drawingGrid(xStartWorld1 ,yStartWorld1 ,sideCarrousel,sideCarrousel,array);
}