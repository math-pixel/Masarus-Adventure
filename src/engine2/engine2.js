function startEngine2(){
    // background(200);
    // image(backgroundImage, 0, 0)

    // fill(0,0,0,10)
    // rect(0,0,1000,578) 

    setRandomRotation(MapPipeGame.Map.layers);
    drawMapEngine2(MapPipeGame.Map.layers);

    if (debugMode) {
        fill(255,150,0)
        rect(0,0,30,20)   
    }
}