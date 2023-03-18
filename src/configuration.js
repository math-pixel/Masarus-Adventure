let world1 
let Maps =[]
let MapPipeGame;

let assetsLoaded = false;
let numberAssetsLoading = 0;
let numberLoad = 12;

//current engine
let engine = "startMenu";

// map engine 1
let ArrayWorldDisplay = [];

let sideCarrousel;

let xStartWorld1 = 0;
let yStartWorld1 = 0;

let worldBoncing = []; //[x,y,w,h]

let nbRow;
let nbColumn;

let currentMap = "tour"; // pour set le world a cette map la 

let speedMoveMap = 8;

// map engine 2
let xStartWorld2 = 250;
let yStartWorld2 = 35;

//perso
let xPlayer = 500;
let yPlayer = 281;

let speedMovePlayer = 8;

let playerCanMoveXLeft = false;
let playerCanMoveXRight = false;
let playerCanMoveYTop = false;
let playerCanMoveYBottom = false;

let playerNotCollisionPNJ = true;

// animation player
let playerTileSet = [];
let direction = 0;
let currentFramePlayer = 0;

let animTop = [];
let animBottom = [];
let animRight = [];
let animLeft = [];

//PNJ
let PNJinFrontOfPlayer = false;

let pnjTileSet1 = [];
let pnjAnimTop1 = [];
let pnjAnimBottom1 = [];
let pnjAnimRight1 = [];
let pnjAnimLeft1 = [];

let pnjTileSet2 = [];
let pnjAnimTop2 = [];
let pnjAnimBottom2 = [];
let pnjAnimRight2 = [];
let pnjAnimLeft2 = [];

//animation tile interaction 
let exclamationPoint = [];

// cam 
let Hcam = 500;
let Wcam = Hcam * (16/9);
let Xcam = ( xPlayer + 20 / 2) -  Wcam/2;
let Ycam = (yPlayer + 20 / 2) - Hcam/2;

let camCanMoveX = true;
let camCanMoveY = true;

let rectCam = [Xcam,Ycam,Xcam + Wcam, Ycam +Hcam]

//Map TileSet
let tileSet;
let allTiles = [];


//Debuger Variable
let drawCollision = false;

//font
let fontGravityBold;

//interaction
let canInteract = false

//journal engine 2
let journalTiles = [];

//* drawable Image background
let backgroundImage;

function loadAsset(){
    loadJSON("./JSON/assets.json", (e) => {
        loading(e.assets);
    }, (err) => {
        console.log("error : ",err)
    });

    fontGravityBold = loadFont('font/GravityBold.ttf');
}

function loading(assetArray){

    assetArray.forEach((elm, index) => {
        // load all JSON FILE
        switch(elm.type){
            //! ########### WORLD JSON
            case "world" :
                world1 = loadJSON(elm.path, (e)=>{
                    numberAssetsLoading += 1 ;
                    isLoaded();
                });
                break;
            //! ########### MAP ENGINE 1 JSON
            case "mapsEngine1" :
                Maps = loadJSON(elm.path, (e)=> {
                    initVariableWorld(e);
                    numberAssetsLoading += 1 ; 
                    isLoaded();   
                });
                break;
            //! ########### MAP ENGINE 2 JSON
            case "mapsEngine2" :
                MapPipeGame = loadJSON(elm.path, ()=>{
                    numberAssetsLoading += 1 ;
                    isLoaded();
                });
                break;
            case "exclamation" :
                loadImage(elm.path, (e)=>{
                    numberAssetsLoading += 1 ;
                    exclamationPoint = cutTiles(e, 32);
                    // console.log("exclam",exclamationPoint)
                    isLoaded();
                });
                break;
            case "journal" :
                loadImage(elm.path, (e)=>{
                    numberAssetsLoading += 1 ;
                    journalTiles = cutTiles(e, 32);
                    isLoaded();
                });
                break;
            //! ########### PLAYER ASSETS
            case "entity":
                switch(elm.name){

                    case "player" :
                        switch(elm.direction){
                            case "top":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    animTop = cutTiles(e, 64);
                                    isLoaded();
                                });
                                break;
                            case "bottom":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    animBottom = cutTiles(e, 64);
                                    // console.log(animBottom)
                                    isLoaded();
                                });
                                break;
                            case "left":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    animLeft = cutTiles(e, 64);
                                    isLoaded();
                                });
                                break;
                            case "right":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    animRight = cutTiles(e, 64);
                                    isLoaded();
                                });
                                break;
                            default:
                                throw new Error("name aniùation in Json file doesnt correspond")
                        }
                        break;

                    case "pnj1" :
                        switch(elm.direction){
                            
                            case "top":
                                
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    pnjAnimTop1 = cutTiles(e, 32);
                                    isLoaded();
                                });
                                break;
                            case "bottom":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    pnjAnimBottom1 = cutTiles(e, 32);
                                    console.log("yey" ,pnjAnimBottom1)
                                    isLoaded();
                                });
                                break;
                            case "left":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    pnjAnimLeft1 = cutTiles(e, 32);
                                    isLoaded();
                                });
                                break;
                            case "right":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    pnjAnimRight1 = cutTiles(e, 32);
                                    isLoaded();
                                });
                                break;
                            default:
                                throw new Error("name aniùation in Json file doesnt correspond")
                        }
                        break;

                    case "pnj2" :
                        switch(elm.direction){
                            
                            case "top":
                                
                                console.log("fdp", elm.path)
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    pnjAnimTop2 = cutTiles(e, 32);
                                    isLoaded();
                                });
                                break;
                            case "bottom":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    pnjAnimBottom2 = cutTiles(e, 32);
                                    isLoaded();
                                });
                                break;
                            case "left":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    pnjAnimLeft2 = cutTiles(e, 32);
                                    isLoaded();
                                });
                                break;
                            case "right":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    pnjAnimRight2 = cutTiles(e, 32);
                                    isLoaded();
                                });
                                break;
                            default:
                                throw new Error("name animation in Json file doesnt correspond")
                        }
                        break;
                }
                break;            
            //! ########### MAP TILE ASSETS
            case "map":
                loadImage(elm.path, (e) => {
                    tileSet = e;
                    allTiles = cutTiles(tileSet, 32);
                })
                break;

            //? ERROR MANAGEMENT
            default:
                throw new Error("Error wrong type")
        }
        
        
    })
}


function isLoaded(){

    if (numberAssetsLoading === numberLoad) {

        playerTileSet = [animTop,animBottom,animLeft,animRight];

        pnjTileSet1 = [pnjAnimTop1,pnjAnimBottom1,pnjAnimLeft1,pnjAnimRight1];
        pnjTileSet2 = [pnjAnimTop2,pnjAnimBottom2,pnjAnimLeft2,pnjAnimRight2];

        console.log(playerTileSet)
        console.log(pnjTileSet1)
        console.log(pnjTileSet2)
        assetsLoaded = true;
        // console.log("start Game")
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










