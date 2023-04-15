let world1 
let Maps =[]
let MapPipeGame;

let assetsLoaded = false;
let numberAssetsLoading = 0;
let numberLoad = 49 ;

//! current engine
let lastEngine = "startMenu";
let engine = "startMenu";
let displayDialogue = false;

//! map engine 1
let ArrayWorldDisplay = [];

let sideCarrousel;

let xStartWorld1 = 0;
let yStartWorld1 = 0;

let worldBoncing = []; //[x,y,w,h]

let nbRow;
let nbColumn;

//? on commence a la map 20
let currentMap = "tilemap_20"; // pour set le world a cette map la  

let speedMoveMap = 8;
let canMove = true;

//! quest system
let currentAdvancementQuest = 0;

//? layer info
let layerCollision = 2;
let layerInteraction = 3;
let blockToNotCollision = 0;    
let playerLayer = 3

//! map engine 2
let xStartWorld2 = 250;
let yStartWorld2 = 35;

//! perso
let xPlayer = 500;
let yPlayer = 281;

// let speedMovePlayer = 8;

let playerCanMoveXLeft = false;
let playerCanMoveXRight = false;
let playerCanMoveYTop = false;
let playerCanMoveYBottom = false;

let playerNotCollisionPNJ = true;

//! animation player
let playerTileSet = [];
let direction = 0;
let currentFramePlayer = 0;
let moduloAnimation = 10;

let animTop = [];
let animBottom = [];
let animRight = [];
let animLeft = [];
let animIDLEBottom = [];
let animIDLETop = [];
let animIDLELeft = [];
let animIDLERight = [];

//! PNJ
let allPnj = []
let PNJinFrontOfPlayer = false;

let pandaTileSet = [];
let pandaAnimIdleTop = [];
let pandaAnimIdleBottom = [];
let pandaAnimRight = [];
let pandaAnimLeft = [];
let pandaAnimIdleRight = [];
let pandaAnimIdleLeft = [];

let pnjTileSet2 = [];
let pnjAnimTop2 = [];
let pnjAnimBottom2 = [];
let pnjAnimRight2 = [];
let pnjAnimLeft2 = [];

let pnjTileMasaruFather = [];
let MasaruFatherAnimLeftIdle = [];
let MasaruFatherAnimLeft = [];
let MasaruFatherAnimRightIdle = [];
let MasaruFatherAnimRight = [];
let MasaruFatherAnimBottomIdle = [];
let MasaruFatherAnimTopIdle = [];

//! animation tile interaction 
let exclamationPoint = [];

//! cam 
let Hcam = 500;
let Wcam = Hcam * (16/9);
let Xcam = ( xPlayer + 20 / 2) -  Wcam/2;
let Ycam = (yPlayer + 20 / 2) - Hcam/2;

let camCanMoveX = true;
let camCanMoveY = true;

let rectCam = [Xcam,Ycam,Xcam + Wcam, Ycam +Hcam]

//! Map TileSet
let tileSet;
let allTiles = [];


//! Debuger Variable
let debugMode = false;

//! font
let fontGravityBold;
let fontTypeCast;
let fontTypeCastItalic;

//! interaction PNJ
let canInteract = false

//! interaction MAP
let keyInteractionIsPressed = false;

//! journal engine 2
let journalTiles = [];

//!UI
// ui menu
let background_ui;
let imageInstruction;
let logo;

//? button
let play_button;
let credit_button;
let setting_button;
let continue_button;

let play_button_hover;
let settings_button_hover;
let credit_button_hover;
let continue_button_hover

//?shamisen
let displayShamisen = false
let currentSpriteShamisen = 0
let spriteSheetShamisen = [];
let shamisen_1;
let shamisen_2;
let shamisen_3;
let shamisen_4;

//? mouse
let mouseTileset = []


//! head
let masaru_head; 
let masaruFather_head

// dialogue
let backgroud_dialogue_box

//inventory
let inventoryContent = [];

let globalSideInventoryX = 0;
let globalSideInventoryY = 0;


//* drawable Image background
let backgroundImage;

function loadAsset(){
    loadJSON("./JSON/assets.JSON", (e) => {
        loading(e.assets);
    }, (err) => {
        console.log("error : ",err)
    });

    fontGravityBold = loadFont('font/GravityBold.ttf');
    fontTypeCast =  loadFont('font/Typecast.ttf');
    fontTypeCastItalic =  loadFont('font/Typecast-Italic.ttf');
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
                    journalTiles = cutTiles(e, 64);
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
                            case "idlebottom":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    animIDLEBottom = cutTiles(e, 64);
                                    isLoaded();
                                })
                                break;
                            case "idletop":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    animIDLETop = cutTiles(e, 64);
                                    isLoaded();
                                })
                                break;
                            case "idleleft":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    animIDLELeft = cutTiles(e, 64);
                                    isLoaded();
                                })
                                break;
                            case "idleright":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    animIDLERight = cutTiles(e, 64);
                                    isLoaded();
                                })
                                break;
                            default:
                                throw new Error("name aniùation in Json file doesnt correspond")
                        }
                        break;

                    case "pnj1" :
                        switch(elm.direction){
                            
                            case "idletop":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    pandaAnimIdleTop = cutTiles(e, 64);
                                    console.log(pandaAnimIdleTop)
                                    isLoaded();
                                });
                                break;
                            case "idlebottom":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    pandaAnimIdleBottom = cutTiles(e, 64);
                                    isLoaded();
                                });
                                break;
                            case "left":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    pandaAnimLeft = cutTiles(e, 64);
                                    isLoaded();
                                });
                                break;
                            case "right":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    pandaAnimRight = cutTiles(e, 64);
                                    isLoaded();
                                });
                                break;
                            case "idleleft":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    pandaAnimIdleLeft = cutTiles(e, 64);
                                    isLoaded();
                                });
                                break;
                            case "idleright":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    pandaAnimIdleRight = cutTiles(e, 64);
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
                                
                                // console.log("fdp", elm.path)
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
                
                    case "masaruFather":
                        switch(elm.direction){
                            case "bottomIdle":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    MasaruFatherAnimBottomIdle = cutTiles(e, 64);
                                    isLoaded();
                                });
                                break;
                            case "idletop":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    MasaruFatherAnimTopIdle = cutTiles(e, 64);
                                    isLoaded();
                                });
                                break;
                            case "left":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    MasaruFatherAnimLeft = cutTiles(e, 64);
                                    isLoaded();
                                });
                                break;
                            case "leftIdle":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    MasaruFatherAnimLeftIdle = cutTiles(e, 64);
                                    isLoaded();
                                });
                                break;
                            case "right":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    MasaruFatherAnimRight = cutTiles(e, 64);
                                    isLoaded();
                                });
                                break;
                            case "rightIdle":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    MasaruFatherAnimRightIdle = cutTiles(e, 64);
                                    isLoaded();
                                });
                                break;
                        }
                        break;
                    }
                break;            
            //! ########### MAP TILE ASSETS
            case "map":
                loadImage(elm.path, (e) => {
                    tileSet = e;
                    allTiles = cutTiles(e, 32);
                    numberAssetsLoading += 1 ;
                    isLoaded();
                })
                break;
            
            //! UI
            case "ui":
                switch (elm.name){
                    case "backgroud_dialogue_box":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            backgroud_dialogue_box = e;
                            isLoaded();
                        })                        
                    break;

                    case "mouseAnimation":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            mouseTileset = cutTiles(e, 64);
                            isLoaded();
                        })                        
                    break;

                    case "masaru_head":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            masaru_head = e;
                            isLoaded();
                        })                        
                    break;

                    case "masaruFather_head":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            masaruFather_head = e;
                            isLoaded();
                        })                        
                    break;

                    case "play_button":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            play_button = e;
                            isLoaded();
                        })                        
                    break;

                    case "replay_button_main":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            continue_button = e;
                            isLoaded();
                        })                        
                    break;

                    case "replay_button_hover":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            continue_button_hover = e;
                            isLoaded();
                        })                        
                    break;

                    case "credit_button":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            credit_button = e;
                            isLoaded();
                        })                        
                    break;

                    case "setting_button":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            setting_button = e;
                            isLoaded();
                        })                        
                    break;

                    case "background_ui":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            background_ui = e;
                            isLoaded();
                        })                        
                    break;

                    case "imageInstruction":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            imageInstruction = e;
                            isLoaded();
                        })                        
                    break;

                    case "logo":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            logo = e;
                            isLoaded();
                        })                        
                    break;

                    case "play_button_hover":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            play_button_hover = e;
                            isLoaded();
                        })                        
                    break;

                    case "settings_button_hover":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            settings_button_hover = e;
                            isLoaded();
                        })                        
                    break;

                    case "credit_button_hover":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            credit_button_hover = e;
                            isLoaded();
                        })                        
                    break;

                    case "shamisen_1":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            shamisen_1 = e;
                            isLoaded();
                        })                        
                    break;

                    case "shamisen_2":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            shamisen_2 = e;
                            isLoaded();
                        })                        
                    break;

                    case "shamisen_3":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            shamisen_3 = e;
                            isLoaded();
                        })                        
                    break;

                    case "shamisen_4":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            credit_button_shamisen_4hover = e;
                            isLoaded();
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

        playerTileSet = [animTop,animBottom,animLeft,animRight, animIDLETop, animIDLEBottom, animIDLELeft, animIDLERight ];

        pandaTileSet = [pandaAnimIdleRight,pandaAnimRight,pandaAnimIdleLeft,pandaAnimLeft,pandaAnimIdleBottom,pandaAnimIdleTop];
        pnjTileSet2 = [pnjAnimTop2,pnjAnimBottom2,pnjAnimLeft2,pnjAnimRight2];
        pnjTileMasaruFather = [MasaruFatherAnimRightIdle,MasaruFatherAnimRight,MasaruFatherAnimLeftIdle,MasaruFatherAnimLeft,MasaruFatherAnimBottomIdle,MasaruFatherAnimTopIdle]
        // console.log(MasaruFatherAnimLeft)

        console.log(MasaruFatherAnimTopIdle)
        // console.log(pnjTileSet1)
        // console.log(pnjTileSet2)

        assetsLoaded = true;

        inventoryContent = [null,null,null,null,null];
        spriteSheetShamisen = [allTiles[0],shamisen_1,shamisen_2,shamisen_3,shamisen_4]
        console.log("end is loaded")
    }
}


function initVariableWorld(e){
    //init variable
    sideCarrousel = e.sizeCarrousel;
    nbRow = e.nbRow;
    nbColumn = e.nbColumn;
    for (let index = 0; index < 1; index++) {
        ArrayWorldDisplay.push(Maps[Object.keys(Maps)[index]])
    }


    // start map at precise tilemap
    let coordMap = findIndexValueIn2dArray(world1.World,currentMap)

    xStartWorld1 = - coordMap[1] * nbColumn * sideCarrousel
    yStartWorld1 = - coordMap[0] * nbRow * sideCarrousel

    console.log('%c coord : ', 'background: #222; color: #FFFF00',  xStartWorld1, yStartWorld1, " START WITH VALUE : currentMap") 
}










