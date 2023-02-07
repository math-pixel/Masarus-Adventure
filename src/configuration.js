let world1 
let Maps =[]
let MapPipeGame;

let assetsLoaded = false;
let numberAssetsLoading = 0;
let numberLoad = 4;

//moteur de jeu
let engine = "engine1";

// map
let ArrayWorldDisplay = [];

let sideCarrousel;

let xStartWorld1 = 250;
let yStartWorld1 = 250;

let worldBoncing = []; //[x,y,w,h]

let nbRow;
let nbColumn;

let currentWorld = "tour"; // pour set le world a cette map la 

//perso
let xPlayer = 500;
let yPlayer = 500;

let playerTileSet = [];
let animTop = [];
let animBottom = [];
let animRight = [];
let animLeft = [];

// cam 
let Hcam = 400;
let Wcam = Hcam * (16/9);
let Xcam = ( xPlayer + 20 / 2) -  Wcam/2;
let Ycam = (yPlayer + 20 / 2) - Hcam/2;

let rectCam = [Xcam,Ycam,Xcam + Wcam, Ycam +Hcam]


function loadAsset(){

    let assets = [
        {
            path: "../JSON/engine1/world.json",
            type: "world"
        },
        {
            path:"../JSON/engine1/allMaps.json",
            type:"mapsEngine1"
        },
        {
            path:"../JSON/engine2/pipeGameMap.json",
            type:"mapsEngine2"
        },
        {
            path:"../assetsTemp/top_1.png",
            type:"perso",
            animation: "Top",
            index: 0
        },
        
    ];

    assets.forEach((elm, index) => {

        // load all JSON FILE
        switch(elm.type){
            case "world" :
                world1 = loadJSON(elm.path, (e)=>{
                    numberAssetsLoading += 1 ;
                    isLoaded();
                });
                break;
            case "mapsEngine1" :
                Maps = loadJSON(elm.path, (e)=> {
                    initVariableWorld(e);
                    numberAssetsLoading += 1 ; 
                    isLoaded();   
                });
                break;
            case "mapsEngine2" :
                MapPipeGame = loadJSON(elm.path, ()=>{
                    numberAssetsLoading += 1 ;
                    isLoaded();
                });
                break;
            case "perso" :

                loadImage(elm.path, (e)=>{
                    numberAssetsLoading += 1 ;
                    animTop.splice(elm.index, 0, e);
                    isLoaded();
                });

                break;
            default:
                throw new Error("Error wrong type")
        }
        
        
    })
    
    // persoLeft = loadImage("../assetsTemp/left_1.png");
    // persoRight = loadImage("../assetsTemp/right_1.png");
    // persoDown = loadImage("../assetsTemp/bottom_1.png");
}


function isLoaded(){
    console.log(numberAssetsLoading)
    playerTileSet = [animTop,animBottom,animLeft,animRight];
    console/log("player")
    if (numberAssetsLoading === numberLoad) {
        assetsLoaded = true;


        console.log("start Game")
    }
}


function initVariableWorld(e){
    sideCarrousel = e.sizeCarrousel;

    nbRow = e.nbRow;
    nbColumn = e.nbColumn;

    for (let index = 0; index < 1; index++) {
        ArrayWorldDisplay.push(Maps[Object.keys(Maps)[index]])
    }

    console.log(ArrayWorldDisplay)
}










