function preload(){
    //load JSON and Img file
    loadAsset(); 
}

function setup(){
    createCanvas(1000, 578);
    // setUpBackgroundCanvas()
    textFont(fontTypeCast);
    textSize(50);
    // console.log(worlds1.tour.layers)
    // pnj : id, xstartPNJ, ystartPNJ, distanceToTravel , skin = [], ratioFrameRate /* 2D array [dir][frame]*/, speed = 1, dialogue = [], actionDialogue = [], headDialogue = []
    createPNJ(8, 3080, 770 , 350, pnjTileSet1, 7, 2 , [["bienvenue", "masaru : yey", "c'est le pnj 1"],["re bonjour", "tu as fini la queste 1", "bravo, felicitation"]], [["engine1", "nextQuest"], ["engine1"]], [[ animTop[0] , masaru_head, animTop[0]],[ animTop[0] , animTop[0], animTop[0]]])
    createPNJ(5, 3500, 770, 500, pnjTileSet1, 15, 1, [["bonjour masaru tien le shamisen", "* vous avez obtenue le shamisen sacree *", "allez oust vas faire dodo"]], [["engine1"]] ,[[animTop[0] , "", animTop[0]]])
}

function draw(){
    // background(200);
    // condition moteur de jeux
    // console.log(canInteract, textDialogue, endAction )
    noSmooth()
    //! select engine
    if (assetsLoaded) {
        switch(engine){
            case "engine1":
                startEngine1();
                break;
            case "engine2":
                startEngine2();
                break;
            case "startMenu":
                menu();
                break;
            case "dialogue":
                startEngineDialogue();
                break;
            default:
                throw new Error("engine error")
        }
    }
    
    //! reset Variable
    keyInteractionIsPressed = false;
}

function keyPressed() {
    if (keyCode === 69) {//? key " e "
        if (engine === "engine1") {
            // setUpBackgroundCanvas()
            engine = "engine2"  
        }else{
            engine = "engine1"
        }
    }else if (keyCode === 27) {//? key " escape "
        engine = "startMenu"
    }else if (keyCode === 65 && canInteract) { //? key " a "
        engine = "dialogue";
        interact()
    }else if(keyCode === 65){
        keyInteractionIsPressed = true;
    }
    
  }