

function preload(){
    //load JSON and Img file
    loadAsset(); 
}

function setup(){
    createCanvas(1000, 562);
    textSize(32);
    text('word', 10, 30);
    // console.log(worlds1.tour.layers)

    createPNJ(5, 500, 200, 500, 1 )
    createPNJ(8, 550, 250, 400, 2 )
}

function draw(){

    background(200);
    // condition moteur de jeux
    noSmooth()
    if (assetsLoaded) {
        switch(engine){
            case "engine1":
                startEngine1();
                break;
            case "engine2":
                startEngine2();
                break;
            default:
                throw new Error("engine error")
        }
    }

    if (keyIsDown(keyCode === UP_ARROW)) {
        if (engine === "engine1") {
            engine = "engine2"
        }else{
            engine = "engine1"
        }
    }

    
    
    pnjManager()
}

function keyPressed() {
    if (keyCode === 69) {
        if (engine === "engine1") {
            engine = "engine2"
        }else{
            engine = "engine1"
        }
    }
    
  }