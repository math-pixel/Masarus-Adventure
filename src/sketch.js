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
    // condition moteur de jeux
    cursor("auto")

    
    noSmooth()
    //! select engine
    if (assetsLoaded) {
        switch(engine){
            case "engine1":
                startAudioAmbiance()
                lastEngine = "engine1"
                startEngine1();
                break;
            case "engine2":
                lastEngine = "engine2"
                startEngine2();
                break;
            case "startMenu":
                // console.log(musicAtmosphere1.isLooping())
                startAudioAmbiance()
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
            case "mapping":
                mapEngine();
                break;
            case "vidsEnd":
                musicAtmosphere1.stop()
                vidsEnd();
                break;
            case "vidsOpening":
                musicAtmosphere1.stop()
                vidsOpening()
                break;
            case "endScreen":
                musicAtmosphere1.stop()
                background("#222222")
                fill(255,255,255)
                text("Fin", 495, 578 / 2)
                break;
            case "clickStart":
                clickStart()
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

    // text([mouseX, " , ", mouseY].join(" "), mouseX, mouseY)
    // console.log(speedMoveMap)
    
    //! fade system
    transitionFaded()
    
    noStroke()
    fill(34,34,34, opacityFade)
    rect(0,0,1000,578)

    // let mask = image(vidShamisenAlpha, 0,0 ,100,578)
    // vidShamisen.mask(pg)
    // tint(255, 125);
    // image(vidShamisen, 0,0 ,1000,578)
}

let nbKeyIsPressed = 0

function keyPressed() {

    if (keyCode != 91 && keyCode != 18 ) {
        nbKeyIsPressed += 1
    }

    
    if (keyCode === 27) {//? key " escape "

        if (engine != "startMenu" && engine != "settingMenu" && engine != "creditMenu" && engine != "vidsEnd" && engine != "vidsOpening" && engine != "clickStart") {
            if (engine !== "pauseMenu") {
                lastEngine = engine
                engine = "pauseMenu"
            }else{
                engine = lastEngine
            }
        }
    }else if(keyCode === 65){
        //! give shamisen
        // addToInventory({"name": "shamisen", "image": allTiles[24]})
    }else if (keyCode === 69 && canInteract) { //? key " e "
        displayDialogue = true
        interact()
    }else if(keyCode === 69){
        keyInteractionIsPressed = true;
    }else if(keyCode === 49){
        //? touche " & "
        useObject(0)
    }else if(keyCode === 50){
        //? touche " é "
        useObject(1)
    }else if(keyCode === 51){
        //? touche " # "
        useObject(2)
    }else if(keyCode === 52){
        //? touche " ' "
        useObject(3)
    }else if(keyCode === 53){
        //? touche " ( "
        useObject(4)
    }else if(keyCode === 77){ //? mappin " m "
        if (engine != "startMenu" && engine != "settingMenu" && engine != "creditMenu") { //! not in menu
            if (engine !== "mapping") {
                lastEngine = engine
                engine = "mapping"
            }else{
                engine = "engine1"
            }
        }
    }else if(keyCode === 97){
        //? touche " 1 "
        engine = "engine1"
    }else if(keyCode === 98){
        //? touche " 2 "
        engine = "engine1"
        yStartWorld1 = -2500

        addToInventory({"name" : "shamisen" , "image": allTiles[24]})
        displayShamisen = true
        currentSpriteShamisen = 2

        quests[0].isFinish = true
        quests[1].isFinish = true
        quests[2].isFinish = true
        questManager()

    }else if(keyCode === 99){
        //? touche " 3 "
        engine = "engine1"
        yStartWorld1 = -2500
        xStartWorld1 = -8200

        addToInventory({"name" : "shamisen" , "image": allTiles[24]})
        displayShamisen = true
        currentSpriteShamisen = 3

        quests[0].isFinish = true
        quests[1].isFinish = true
        quests[2].isFinish = true
        quests[3].isFinish = true
        quests[4].isFinish = true
        quests[5].isFinish = true
        quests[6].isFinish = true
        quests[7].beDisplayed = true
        questManager()

        // playerNearToLandslide = true
    }else if(keyCode === 100){
        //? touche " 4 "
        engine = "engine1"

        quests[0].isFinish = true
        quests[1].isFinish = true
        quests[2].isFinish = true
        quests[3].isFinish = true
        quests[4].isFinish = true
        quests[5].isFinish = true
        quests[6].isFinish = true
        quests[7].isFinish = true
        quests[8].isFinish = true
        quests[9].isFinish = true
        questManager()

        addToInventory({"name" : "shamisen" , "image": allTiles[24]})
        displayShamisen = true
        currentSpriteShamisen = 4
    }
    
}

function keyReleased() {

    if (keyCode != 91 && keyCode != 18 ) {
        nbKeyIsPressed -= 1
    }
}

function transitionFaded(){
    if (transition) {
        if (transitionState == "in") {
            
            if(opacityFade+1 < 255){
                opacityFade += speedTransition
            }else{
                engine = nextEngine
                transitionState = "out"
            }
        }else{
            if(opacityFade - 1 > 0){
                opacityFade -= speedTransition
            }else{
                transition = false
                transitionState = "in"
            }
        }
    }
}

function setUpTransition(speed, nEngine){
    transition = true
    nextEngine = nEngine

    speedTransition = speed
}

function startAudioAmbiance(){
    //* for playing musique one time in the draw function 
    if(!musicAtmosphere1.isLooping()){
        musicAtmosphere1.loop(0,1,0.1)
    }
}



