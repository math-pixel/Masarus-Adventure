

function preload(){
    //load JSON and Img file
    loadAsset(); 
}

function setup(){
    createCanvas(1000, 562);
    setUpBackgroundCanvas()
    textSize(32);
    text('word', 10, 30);
    // console.log(worlds1.tour.layers)
    createPNJ(5, 100, 1250, 500, pnjTileSet1, 15, 1, ["bienvenue", "comment-vas tu ?", "c'est le pnj 2"], "engine2" )
    createPNJ(8, 1000, 480 , 350, pnjTileSet1, 7, 2 , ["bienvenue", "comment-vas tu ?", "c'est le pnj 1"], "engine1")
}

function draw(){

    // background(200);
    // condition moteur de jeux
    noSmooth()
    if (assetsLoaded) {
        switch(engine){
            case "engine1":
                startEngine1();
                pnjManager()
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
    
    
}

function keyPressed() {
    if (keyCode === 69) {
        if (engine === "engine1") {
            setUpBackgroundCanvas()
            engine = "engine2"  
        }else{
            engine = "engine1"
        }
    }else if (keyCode === 27) {
        engine = "startMenu"
        // console.log("cornerTopLeft X : ", xStartWorld1 + xPlayer, xPlayer, " Y : ", yStartWorld2 + yPlayer)
    }else if (keyCode === 65 && canInteract) {
        interact()
    }
    
  }