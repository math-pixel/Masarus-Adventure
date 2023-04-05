function drawingGridPipeGame(x,y,w,h,array){
    for (let row = 0; row < array[0].length; row++) {
        for (let column = 0; column < array.length; column++) {

            angleMode(DEGREES);

            

            push()
            translate(x+w*row,y+h*column);
            stroke(250)
            rotate(array[column][row].rotation);
            image(journalTiles[array[column][row].tile], -w / 2, -h / 2,w,h); //allTiles


            if (array[column][row].rotation != 0) {
                stroke(2)
                noFill()
                rect(-w / 2, -h / 2, w, h)
            }
            
            pop() 

            
        }
    }

    noStroke();
    const maxWidht = w * array.length;
    const maxHeight = w * array[0].length;
    coordMap = [x,y,x + maxWidht , y + maxHeight];// coord de la map rect[x1,y1,x2,y2]
}

function drawMapEngine2(array){

    //x,y,w,h,array
    drawingGridPipeGame(xStartWorld2 ,yStartWorld2 ,sideCarrousel ,sideCarrousel ,array);
}


function mousePressed() {
    let currentIndex;

    // add rotation on tile
    if (pointIsInside(mouseX,mouseY, [xStartWorld2 - sideCarrousel / 2, yStartWorld2 - sideCarrousel / 2 , xStartWorld2 + sideCarrousel * MapPipeGame.Map.layers[0].length, yStartWorld2 + sideCarrousel * MapPipeGame.Map.layers.length])) {
        
        currentIndex = findIndexOfPositionIn2dArray(mouseX,mouseY,MapPipeGame.Map.layers,sideCarrousel,sideCarrousel, xStartWorld2 -sideCarrousel / 2 ,yStartWorld2 -sideCarrousel / 2, "pipeGame")
        
        if (currentIndex[0] > 1 && currentIndex[0] < 5 && currentIndex[1] > 1 && currentIndex[1] < 5) {

            console.log(MapPipeGame.Map.layers[currentIndex[1]][currentIndex[0]].rotation)

            if (MapPipeGame.Map.layers[currentIndex[1]][currentIndex[0]].rotation >= 270) {
                MapPipeGame.Map.layers[currentIndex[1]][currentIndex[0]].rotation = 0;
            }else{
                MapPipeGame.Map.layers[currentIndex[1]][currentIndex[0]].rotation += 90;
            }
    
            // if win else ...
            if (isWin(MapPipeGame.Map.layers)) {
                engine = "engine1";
                alert("win")
            }
        }
        
    }


    //set all tile in good pos for debug win
    if (pointIsInside(mouseX,mouseY , [0,0,30,20])) {
        for (let row = 0; row < MapPipeGame.Map.layers[0].length; row++) {
            for (let column = 0; column < MapPipeGame.Map.layers.length; column++) {
    
                MapPipeGame.Map.layers[column][row].rotation = 0; 

            }
        }

        if (isWin(MapPipeGame.Map.layers)) {
            alert("win")
        } 
    }
}

let mapRandomSet = false;
function setRandomRotation(array){
    if (mapRandomSet == false) {
        for (let row = 0; row < array[0].length; row++) {
            for (let column = 0; column < array.length; column++) {
                
                if (row > 1 && row < 5 && column > 1 && column < 5) {
                    array[column][row].rotation = (Math.floor(Math.random() * (3 - 1 +1))) * 90; 
                }

            }
        }

        mapRandomSet = true;
    }
}

function isWin(array){

    let win = true;

    for (let row = 0; row < array[0].length; row++) {
        for (let column = 0; column < array.length; column++) {

            if (array[column][row].rotation != 0) {
                win = false;
            }

        }
    }

    return win;
}