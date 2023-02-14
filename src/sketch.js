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

    fill(255,0,0)
    rect(100,50,50,50);
    
    // console.log(expandRect(50,50,50,50,2))
    let a = createNewRect(100,50,50,50,1.1)
    fill(0,255,0,100)
    rect(a[0],a[1],a[2],a[3])

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
    
}