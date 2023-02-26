let world1 
let Maps =[]
let MapPipeGame;

let assetsLoaded = false;
let numberAssetsLoading = 0;
let numberLoad = 4;

//current engine
let engine = "engine1";

// map engine 1
let ArrayWorldDisplay = [];

let sideCarrousel;

let xStartWorld1 = 0;
let yStartWorld1 = 0;

let worldBoncing = []; //[x,y,w,h]

let nbRow;
let nbColumn;

let currentMap = "tour"; // pour set le world a cette map la 

// map engine 2
let xStartWorld2 = 250;
let yStartWorld2 = 35;

//perso
let xPlayer = 500;
let yPlayer = 281;
let playerCanMoveX = false;
let playerCanMoveY = false;

// animation player
let playerTileSet = [];
let direction = 0;
let currentFramePlayer = 0;

let animTop = [];
let animBottom = [];
let animRight = [];
let animLeft = [];

// cam 
let Hcam = 500;
let Wcam = Hcam * (16/9);
let Xcam = ( xPlayer + 20 / 2) -  Wcam/2;
let Ycam = (yPlayer + 20 / 2) - Hcam/2;

let camCanMoveX = true;
let camCanMoveY = false;

let rectCam = [Xcam,Ycam,Xcam + Wcam, Ycam +Hcam]

//Map TileSet
let tileSet;
let allTiles = [];


//Debuger Variable
let drawCollision = true;



function loadAsset(){
    loadJSON("../JSON/assets.JSON", (e) => {
        loading(e.assets);
    });    
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
            //! ########### PLAYER ASSETS
            case "perso" :

                switch(elm.animation){
                    case "top":
                        loadImage(elm.path, (e)=>{
                            numberAssetsLoading += 1 ;
                            animTop.splice(elm.index, 0, e);
                            isLoaded();
                        });
                        break;
                    case "bottom":
                        loadImage(elm.path, (e)=>{
                            numberAssetsLoading += 1 ;
                            animBottom.splice(elm.index, 0, e);
                            isLoaded();
                        });
                        break;
                    case "left":
                        loadImage(elm.path, (e)=>{
                            numberAssetsLoading += 1 ;
                            animLeft.splice(elm.index, 0, e);
                            isLoaded();
                        });
                        break;
                    case "right":
                        loadImage(elm.path, (e)=>{
                            numberAssetsLoading += 1 ;
                            animRight.splice(elm.index, 0, e);
                            isLoaded();
                        });
                        break;
                    default:
                        throw new Error("name aniùation in Json file doesnt correspond")
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










