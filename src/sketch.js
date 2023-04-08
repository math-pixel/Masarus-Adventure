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
    createPNJ(8, 3500, 700 , 280, pnjTileMasaruFather, 7, 2 , [["Bonjour mon fils !", "Aujourd’hui est un grand jour pour toi !", "Bonjour père !", "C’est aujourd’hui que je pars à l’aventure, retrouver les 3 cordes de notre shamisen sacré.","Tu sais que tout le village compte sur toi.","Avant que tu partes j’aimerais t’offrir un présent Masaru.","Tu as obtenu le shamisen sacré.","Merci pour votre confiance père.","Je me montrerai digne de cette mission."]],
    [["engine1", "displayShamisen"]],
    [[ masaruFather_head , masaruFather_head,  masaru_head, masaru_head, masaruFather_head , masaruFather_head, "", masaru_head, masaru_head ]])

    createPNJ(5, 4200, 1300, 230, pnjTileSet1, 15, 1, [["Bonjour jeune homme.", "Je pourrais peut être t’aider mais il te faut encore chercher.", "Reviens plus tard."], ["Félicitation jeune homme ! ", "Tu es parvenu à déchiffrer ma lettre.", "C’est donc que tu es digne de recevoir cette corde.", "Fais en bon usage.", "Tu as obtenu une corde.", "Et si tu essayais de jouer du shamisen ?", "Et oui", "Même si le shamisen n’est pas complet,", "Chaque corde te rapproche du sauvetage de l’île.", "Il te reste encore deux cordes alors pars vite terminer ta mission."]],
    [["engine1"],["engine1", "addRopeToShamisen"]],
    [[animTop[0] , animTop[0], animTop[0]], [animTop[0] , animTop[0], animTop[0],animTop[0], "", "" , animTop[0] , animTop[0], animTop[0],animTop[0]]])
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
            default:
                throw new Error("engine error")
        }
    }
    
    //! reset Variable
    keyInteractionIsPressed = false;
}

function keyPressed() {
    // if (keyCode === 69) {//? key " e "
    //     if (engine === "engine1") {
    //         // setUpBackgroundCanvas()
    //         engine = "engine2"  
    //     }else{
    //         engine = "engine1"
    //     }
    // }else 
    if (keyCode === 27) {//? key " escape "
        engine = "startMenu"
    }else if (keyCode === 65 && canInteract) { //? key " a "
        displayDialogue = true
        interact()
    }else if(keyCode === 65){
        keyInteractionIsPressed = true;
    }else if(keyCode === 49){
        //? touch " & "
        engine = "engine2"
    }
    
  }