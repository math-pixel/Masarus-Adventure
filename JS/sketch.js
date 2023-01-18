function preload(){
    //load JSON and Img file
    loadAsset();
}

function setup(){
    createCanvas(1000, 1000);
    // console.log(worlds1.tour.layers)
}

function draw(){
    // condition moteur de jeux

    // switch(engine){
    //     case "engine1":
    //         UseEngine1();
    //         DisplayWorldEngine1();
    //         break;
    //     case "engine2":
    //         UseEngine2();
    //         DisplayWorldEngine2()
    // }

    background(200);

    drawPlayer()
    drawMap()

}