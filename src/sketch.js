function preload(){
    //load JSON and Img file
    loadAsset(); 
}

function setup(){
    console.log("start setup")
    createCanvas(1000, 578);
    frameRate(60);

    // setUpBackgroundCanvas()
    textFont(fontTypeCast);
    textSize(50);
    // console.log(worlds1.tour.layers)

    
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
            case "pauseMenu":
                pauseMenu();
                break;
            default:
                throw new Error("engine error")
        }
    }
    
    //! reset Variable
    keyInteractionIsPressed = false;
}

function keyPressed() {
    
    if (keyCode === 27) {//? key " escape "

        if (engine != "startMenu") {
            if (engine !== "pauseMenu") {
                lastEngine = engine
                engine = "pauseMenu"
            }else{
                engine = lastEngine
            }
        }
    }else if (keyCode === 69 && canInteract) { //? key " a "
        displayDialogue = true
        interact()
    }else if(keyCode === 69){
        keyInteractionIsPressed = true;
    }else if(keyCode === 49){
        //? touche " 1 "
        useObject(0)
    }else if(keyCode === 50){
        //? touche " 2 "
        useObject(1)
    }else if(keyCode === 51){
        //? touche " 3 "
        useObject(2)
    }else if(keyCode === 52){
        //? touche " 4 "
        useObject(3)
    }else if(keyCode === 53){
        //? touche " 5 "
        useObject(4)
    }
    
  }