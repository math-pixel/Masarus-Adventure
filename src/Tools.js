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

function createNewRect(x,y,w,h,ratio){
    //? expand
    if (ratio === 1 ) {
        throw new Error("le ratio doit etre different de 1")
    }else if (ratio > 1) {

        let phaseShiftX =  ((w*ratio) - w ) /2;
        let phaseShiftY =  ((h*ratio) - h ) /2;
        let expandedRect = [x - phaseShiftX, y - phaseShiftY, w * ratio, h * ratio];
        
        return expandedRect;
    }else{
    //?shrink
        

        let phaseShiftX =  (w - (w*ratio)) /2;
        let phaseShiftY =  (h - (h*ratio) ) /2;
        let expandedRect = [x + phaseShiftX, y + phaseShiftY, w * ratio, h * ratio];

        return expandedRect;
        
    }
}


//#region //! GET CORNER
// Tout fonctionne avec un tableau pour exprimer un rectangle sous cette forme -> [x, y, largeur, hauteur]

// Get Corners
// Prends un rect et renvoie un point sous forme -> [x, y]
function getTopCornerLeft(rect) {
    return [rect[0], rect[1]]
}

function getTopCornerRight(rect) {
    return [rect[0] + rect[2], rect[1]]
}

function getBottomCornerLeft(rect) {
    return [rect[0], rect[1] + rect[3]]
}

function getBottomCornerRight(rect) {
    return [rect[0] + rect[2], rect[1] + rect[3]]
}
//#endregion


// Point is in rect
// Prend un point et un rect et renvoie true ou false
function pointIsInRect(point, rect) {
    if (point[0] > rect[0] && point[0] < (rect[0] + rect[2]) && point[1] > rect[1] && (rect[1] + rect[3])) {
        return true
    }
    return false
}

// rect is in rect
// prend deux rect et renvoie un tableau avec les points qui sont en contact avec le deuxième rectangle
function rectIsInRect(rect1, rect2) {
    if (pointIsInRect(getTopCornerLeft(rect1[0], rect1[1], rect1[2], rect1[3]), rect2)) {
        return true
    }
    if (pointIsInRect(getTopCornerRight(rect1[0], rect1[1], rect1[2], rect1[3]), rect2)) {
        return true
    }
    if (pointIsInRect(getBottomCornerLeft(rect1[0], rect1[1], rect1[2], rect1[3]), rect2)) {
        return true
    }
    if (pointIsInRect(getBottomCornerRight(rect1[0], rect1[1], rect1[2], rect1[3]), rect2)) {
        return true
    }
    return false
}