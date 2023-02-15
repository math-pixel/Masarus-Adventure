let img;
let img2;
let alphaImg;

function preload(){
    //load JSON and Img file
    loadAsset();

    
    img = loadImage('assets/grass_center.png');
    img2 = loadImage('assets/path_top.png');
}

function setup(){
    createCanvas(1000, 1000);
    textSize(32);
    text('word', 10, 30);
    // console.log(worlds1.tour.layers)
}

function draw(){

    background(200);
    // condition moteur de jeux

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

    fill(255,0,0)
    rect(660,510,50,50);
    fill(255,200,0)
    rect(700,500,50,50);
    
    console.log(rectIsInRect([660,510,50,50], [700,500,50,50]))

}