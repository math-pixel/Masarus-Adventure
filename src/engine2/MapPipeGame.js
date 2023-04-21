function drawingGridPipeGame(x,y,w,h,array){
    for (let row = 0; row < array[0].length; row++) {
        for (let column = 0; column < array.length; column++) {

            angleMode(DEGREES);

            

            push()
            translate(x+w*row,y+h*column);
            stroke(250)
            rotate(array[column][row].rotation);
            image(tilesetEngine2[array[column][row].tile], -w / 2, -h / 2,w,h); //allTiles


            if (array[column][row].rotation != 0) {
                stroke(2)
                noFill()
                rect(-w / 2, -h / 2, w, h)
            }
            
            pop() 

            
        }
    }

    noStroke();
}

function drawMapEngine2(array){

    //x,y,w,h,array
    drawingGridPipeGame(xStartWorld2 ,yStartWorld2 ,sideCarrousel ,sideCarrousel ,array);
}


function mousePressed() {
    let currentIndex;

    //! add rotation on tile
    if (pointIsInside(mouseX,mouseY, [xStartWorld2 - sideCarrousel / 2, yStartWorld2 - sideCarrousel / 2 , xStartWorld2 + sideCarrousel * MapPipeGame.Map.layers[0].length, yStartWorld2 + sideCarrousel * MapPipeGame.Map.layers.length])) {
        
        currentIndex = findIndexOfPositionIn2dArray(mouseX,mouseY,MapPipeGame.Map.layers,sideCarrousel,sideCarrousel, xStartWorld2 -sideCarrousel / 2 ,yStartWorld2 -sideCarrousel / 2, "pipeGame")
        
        if (currentIndex[0] > 1 && currentIndex[0] < 6 && currentIndex[1] > 1 && currentIndex[1] < 6) {

            console.log(MapPipeGame.Map.layers[currentIndex[1]][currentIndex[0]].rotation)

            if (MapPipeGame.Map.layers[currentIndex[1]][currentIndex[0]].rotation >= 270) {
                MapPipeGame.Map.layers[currentIndex[1]][currentIndex[0]].rotation = 0;
            }else{
                MapPipeGame.Map.layers[currentIndex[1]][currentIndex[0]].rotation += 90;
            }
    
            // if win else ...
            //! win
            if (isWin(MapPipeGame.Map.layers)) {

                //! if parchemin wait 10 sec for reading time 
                if (!quests[1].isFinish) {
                    setTimeout(() => {
                        winEngine2()
                    }, "10000")
                }else if(quests[5].isFinish && !quests[6].isFinish){
                    winEngine2()
                }

                engine = "engine1";
            }
        }
        
    }


    //! CHEAT MODE
    if (pointIsInside(mouseX,mouseY , [0,0,30,20])) {


        //! win

        //! cheat mode no wait
        alert("win ")
        winEngine2()

    }
}

let mapRandomSet = false;
function setRandomRotation(array){
    if (mapRandomSet == false) {
        for (let row = 0; row < array[0].length; row++) {
            for (let column = 0; column < array.length; column++) {
                
                if (row > 1 && row < 6 && column > 1 && column < 6) {
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



function winEngine2(){
    //! si quete 1 pas fini
    if (!quests[1].isFinish) {

        engine = "engine1";

        //* quest finish
        quests[1].isFinish = true
        questManager()

    }

    //! si quete 6 pas fini donc coffre
    if (quests[5].isFinish && !quests[6].isFinish) {
        
        quests[6].isFinish = true
        questManager()

        //? return to engine 1
        engine = "engine1";

        //* set up dialogue
        canInteract = true

        textDialogue = ["tu as obtenu une corde"]
        endAction = ["engine1", "addRopeToShamisen", "startDialogueQuest8"]
        imagePersonTalking = [""]

        //* display dialogue
        displayDialogue = true
        interact()

 
    }
}