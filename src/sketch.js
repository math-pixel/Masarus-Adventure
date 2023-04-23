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


    //! quest system
    questManager()

    
    
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
                lastEngine = "engine1"
                startEngine1();
                break;
            case "engine2":
                lastEngine = "engine2"
                startEngine2();
                break;
            case "startMenu":
                startMenu();
                break;
            case "pauseMenu":
                pauseMenu();
                break;
            case "settingMenu":
                settingMenu();
                break;
            case "creditMenu":
                creditMenu();
                break;
            default:
                throw new Error("engine error")
        }
    }
    
    //! reset Variable
    keyInteractionIsPressed = false;

    //! log speed when 2 key is down
    if(nbKeyIsPressed < 2){
        speedMoveMap = 8
    }else{
        speedMoveMap = 3.5 * 8/4
    }

    // console.log(speedMoveMap)
}

let nbKeyIsPressed = 0

function keyPressed() {

    if (keyCode != 91 && keyCode != 18 ) {
        nbKeyIsPressed += 1
    }

    
    if (keyCode === 27) {//? key " escape "

        if (engine != "startMenu" && engine != "settingMenu" && engine != "creditMenu") {
            if (engine !== "pauseMenu") {
                lastEngine = engine
                engine = "pauseMenu"
            }else{
                engine = lastEngine
            }
        }
    }else if(keyCode === 65){
        //! give shamisen
        addToInventory({"name": "shamisen", "image": allTiles[6]})
    }else if (keyCode === 69 && canInteract) { //? key " e "
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

function keyReleased() {

    if (keyCode != 91 && keyCode != 18 ) {
        nbKeyIsPressed -= 1
    }
}