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

let currentMap = "tour"; // pour set le world a cette map la 

//perso
let xPlayer = 500;
let yPlayer = 500;

// animation player
let playerTileSet = [];
let direction = 0;
let currentFramePlayer = 0;

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

//Map TileSet
let alphaImg;
let grass_main;
let path_corner_bottomLeft;
let path_corner_bottomRight;
let path_corner_topLeft;
let path_corner_topRight;
let path_horizontal;
let path_vertical;
let fence_horizontal;

//Debuger Variable
let drawCollision = false;



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
                switch(elm.tileName){
                    case "air":
                        loadImage(elm.path, (e) => {
                            alphaImg = e
                        })
                        break;
                    case "grass_main":
                        loadImage(elm.path, (e) => {
                            grass_main = e
                        })
                        break;
                    case "path_corner_bottomLeft":
                        loadImage(elm.path, (e) => {
                            path_corner_bottomLeft = e
                        })
                        break;
                    case "path_corner_bottomRight":
                        loadImage(elm.path, (e) => {
                            path_corner_bottomRight = e
                        })
                        break;
                    case "path_corner_topLeft":
                        loadImage(elm.path, (e) => {
                            path_corner_topLeft = e
                        })
                        break;
                    case "path_corner_topRight":
                        loadImage(elm.path, (e) => {
                            path_corner_topRight = e
                        })
                        break;
                    case "path_horizontal":
                        loadImage(elm.path, (e) => {
                            path_horizontal = e
                        })
                        break;
                    case "path_vertical":
                        loadImage(elm.path, (e) => {
                            path_vertical = e
                        })
                        break;
                    case "fence_horizontal":
                        loadImage(elm.path, (e) => {
                            fence_horizontal = e
                        })
                        break;
                }
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










