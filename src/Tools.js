function pointIsInside(x,y,RectPos){
    return (x > RectPos[0] && x < RectPos[2] && y > RectPos[1] && y < RectPos[3]);
} 

function whichCaseInGrid(X,Y,array, sideCarrousel){
    for (let row = 0; row < array[0].length; row++) {
        for (let column = 0; column < array.length; column++) { 

            let x = array[0]+sideCarrousel*row;
            let y = array[1]+sideCarrousel*column;

            // console.log([x,y,x + width, y + height])

            if (pointIsInside(X,Y,[x,y,x + 50, y + 50])){
                return([row,column]);
            }         
        }
    }
    return null;
}

function findIndexValueIn2dArray(array, value){
    for (let row = 0; row < array[0].length; row++) {
        for (let column = 0; column < array.length; column++) {
            // alert(array)
            if (value === array[column][row]) {
                return [column,row];
            }
        }
    }
    return null;
}


let previous_index_pos;
function findIndexOfPositionIn2dArray(posX,posY,array,sideArrayX,sideArrayY){

    for (let row = 0; row < array.length; row++) {
        for (let column = 0; column < array[0].length; column++) {
            let minX = xStartWorld1 + sideArrayX  * column;
            let minY = yStartWorld1 + sideArrayY  * row ;

            
            

            let maxX = xStartWorld1  + sideArrayX  * (column + 1);
            let maxY = yStartWorld1  + sideArrayY * (row + 1);

            if ( row === 0 && column === 0 ) {
                // console.log(maxX,maxY)
            }

            // console.log([ column, row ]);
            if (posX > minX && posX < maxX && posY > minY && posY < maxY) {
                previous_index_pos = [column, row];
                return [column, row];
            }
        }
    }
    return previous_index_pos;
}