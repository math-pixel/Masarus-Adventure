function pointIsInside(x,y,RectPos){
    return (x > RectPos[0] && x < RectPos[2] && y > RectPos[1] && y < RectPos[3]);
} 

function whichCaseInGrid(PlayerX,PlayerY,array, sideCarrousel){
    for (let row = 0; row < array[0].length; row++) {
        for (let column = 0; column < array.length; column++) { 

            let x = array[0]+sideCarrousel*row;
            let y = array[1]+sideCarrousel*column;

            // console.log([x,y,x + width, y + height])

            if (pointIsInside(PlayerX,PlayerY,[x,y,x + 50, y + 50])){
                return([row,column]);
            }         
        }
    }
    return null;
}

function findIndexIn2dArray(array, value){
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