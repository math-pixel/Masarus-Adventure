let world1 
let Maps =[]
let endingMap = []
let MapPipeGame;
let quests;
let currentQuestDisplay;

let assetsLoaded = false;
let numberAssetsLoading = 0;
let numberLoad = 81 ;

let mouseIsRelease = false

//! end game
let isEndOfTheGame = false

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
let startWorldX = -150
let startWorldY = 300

let speedMoveMap = 8;
let canMove = true;

//! quest system
let currentAdvancementQuest = 0;
let theCurrentQuestIsEnded = false;

//? the interactive rock
let playerNearToTheRock = false
let tilemapTheRock = "tilemap_57"
let coordTheRockInteractive = [3, 3]

//? last rope
let tilemapRope = "tilemap_27"
let coordLastRope = [5,5]

//? Landslide
let playerNearToLandslide = false
let tilemapLandslide = "tilemap_57"
let coordTheLandslide = [7, 4]

//! layer info
let layerCollision = 3;
let layerInteraction = 2;
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
let animBackflip = [];

let doingBackFlip = false;
let intervalBackflip = 0;
let frameRatePlayer = 0;

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

let deerTileSet = [];
let deerAnimIdleTop = [];
let deerAnimIdleBottom = [];
let deerAnimRight = [];
let deerAnimLeft = [];
let deerAnimIdleRight = [];
let deerAnimIdleLeft = [];

let leopardTileSet = []
let leopard_bottom_idle = []
let leopard_left_idle = []
let leopard_left = []
let leopard_right = []
let leopard_right_idle = []
let leopard_top_idle = []

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
let fontTypeCastBold;

//! interaction PNJ
let canInteract = false

//! interaction MAP
let keyInteractionIsPressed = false;

//! engine 2
let tilesetEngine2;
let journalTiles = [];
let chestTiles = []

let imageBackgroundEng2
let imageBackgroundEng2Parchemin;
let imageBackgroundEng2Coffre;

//!UI
// ui menu
let background_ui;
let imageInstruction;
let logo;

let index_setting_button_inGame = 0
let setting_button_inGame;

let scintillement = []
let currentFrameScintillement = 0

let e_instruction = []
let currentFrameEinstruction = 0

//? map
let globalmap
let masaru_head_map

//? button
let play_button;
let credit_button;
let setting_button;
let continue_button;
let backToMenu_main;

let play_button_hover;
let settings_button_hover;
let credit_button_hover;
let continue_button_hover;
let backToMenu_hover;

let sound_button_on;
let sound_button_off;

//?shamisen
let displayShamisen = false
let currentSpriteShamisen = 0
let spriteSheetShamisen = [];
let shamisen_1;
let shamisen_2;
let shamisen_3;
let shamisen_4;

//? note Shamisen
let songSprite;
let songSpriteCurrentFrame = 0
let lifeTimeNote = 0
let xNote;
let yNote;

//? note shamien 2
let anim_melodie_sprite_sheet;
let currentFrameMelodieSpriteSheet = 0

//? mouse
let mouseTileset = []

//? inventory
let inventory_empty;

//? quest
let quest_box_1
let quest_box_2

//! video outro / intro
let vidOutro
let vidIntro

//! transition fade
let opacityFade = 0
let transition = false
let transitionState = "in"
let nextEngine = "engine1"
let speedTransition = 1;

//! head
let masaru_head; 
let masaruFather_head
let panda_head;
let head_deer;
let head_leopard

//! dialogue
let backgroud_dialogue_box

//! inventory
let inventoryContent = [];

let globalSideInventoryX = 0;
let globalSideInventoryY = 0;

//! Audio
let useAudio = false

//! importante block
let indexTileParchemin = 25
let indexTileeventaille = 504
let indexLandslide = 704
let indexTilecoffre = 29
let indexTileRoche = 94
let indexRubbleRockTile = 17
let indexTileRope = 165


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
    fontTypeCastBold =  loadFont('font/Typecast-Bold.ttf');

    vidOutro = createVideo("assets/video/Outro_credits.mp4").hide()
    vidIntro = createVideo("assets/video/animation_intro.mp4").hide()

    vidShamisen = createVideo("assets/video/test-shamisen-transparent.mp4").hide()

    vidBackgroundUi = createVideo("assets/video/Background_UI.mp4").hide()
    vidBackgroundUi.loop()

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
            //! ########### Ending Map
            case "endingMap":
                endingMap = loadJSON(elm.path, (e)=>{
                    numberAssetsLoading += 1 ;
                    isLoaded();
                });
                break;
            break
            //! ########### Quest JSON
            case "quest" :
                loadJSON(elm.path, (e)=>{
                    numberAssetsLoading += 1 ;
                    quests = e.quests
                    isLoaded();
                });
                break;
            //! ########### song sprite
            case "songSprite" :
                loadImage(elm.path, (e)=>{
                    numberAssetsLoading += 1 ;
                    songSprite = cutTiles(e, 32)
                    isLoaded();
                });
                break;
            //! ########### PNJs JSON
            case "pnjJSON" :
                loadJSON(elm.path, (e)=> {
                    numberAssetsLoading += 1 ;
                    allPnj = e.PNJS;
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
            case "scintillement":
                loadImage(elm.path, (e)=>{
                    numberAssetsLoading += 1 ;
                    scintillement = cutTiles(e, 32);
                    // console.log("exclam",exclamationPoint)
                    isLoaded();
                });
                break;
            case "anim_melodie_sprite_sheet" :
                loadImage(elm.path, (e)=>{
                    numberAssetsLoading += 1 ;
                    anim_melodie_sprite_sheet = cutTilesSpriteSheet(e, 1000, 578);
                    // console.log("sprite sheet shamisen musique", anim_melodie_sprite_sheet)
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
            case "coffreEng2" :
                loadImage(elm.path, (e)=>{
                    numberAssetsLoading += 1 ;
                    chestTiles = cutTiles(e, 64);
                    isLoaded();
                });
                break;
            case "background_eng2_coffre" :
                loadImage(elm.path, (e)=>{
                    numberAssetsLoading += 1 ;
                    imageBackgroundEng2Coffre = e;
                    isLoaded();
                });
                break;
            case "background_eng2_parchemin" :
                loadImage(elm.path, (e)=>{
                    numberAssetsLoading += 1 ;
                    imageBackgroundEng2Parchemin = e;
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
                            case "BACKFLOP":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    animBackflip = cutTiles(e, 70);
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

                    case "biche" :
                        switch(elm.direction){
                            
                            case "idletop":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    deerAnimIdleTop = cutTiles(e, 64);
                                    isLoaded();
                                });
                                break;
                            case "idlebottom":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    deerAnimIdleBottom = cutTiles(e, 64);
                                    isLoaded();
                                });
                                break;
                            case "left":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    deerAnimLeft = cutTiles(e, 64);
                                    isLoaded();
                                });
                                break;
                            case "right":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    deerAnimRight = cutTiles(e, 64);
                                    isLoaded();
                                });
                                break;
                            case "idleleft":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    deerAnimIdleLeft = cutTiles(e, 64);
                                    isLoaded();
                                });
                                break;
                            case "idleright":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    deerAnimIdleRight = cutTiles(e, 64);
                                    isLoaded();
                                });
                                break;
                            default:
                                throw new Error("name aniùation in Json file doesnt correspond")
                        }
                        break;

                    case "leopard" :
                        switch(elm.direction){
                            
                            case "idletop":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    leopard_top_idle = cutTiles(e, 64);
                                    isLoaded();
                                });
                                break;
                            case "idlebottom":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    leopard_bottom_idle = cutTiles(e, 64);
                                    isLoaded();
                                });
                                break;
                            case "left":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    leopard_left = cutTiles(e, 64);
                                    isLoaded();
                                });
                                break;
                            case "right":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    leopard_right = cutTiles(e, 64);
                                    isLoaded();
                                });
                                break;
                            case "idleleft":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    leopard_left_idle = cutTiles(e, 64);
                                    isLoaded();
                                });
                                break;
                            case "idleright":
                                loadImage(elm.path, (e)=>{
                                    numberAssetsLoading += 1 ;
                                    leopard_right_idle = cutTiles(e, 64);
                                    isLoaded();
                                });
                                break;
                            default:
                                throw new Error("name aniùation in Json file doesnt correspond")
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

                    case "masaru_head_map":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            masaru_head_map = e
                            isLoaded();
                        })                        
                    break;

                    case "head_deer":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            head_deer = e
                            isLoaded();
                        })                        
                    break;

                    case "head_leopard":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            head_leopard = e
                            isLoaded();
                        })                        
                    break;
                    
                    case "globalmap":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            globalmap = e
                            isLoaded();
                        })                        
                    break;

                    case "setting_button_inGame":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            setting_button_inGame = cutTiles(e, 32);
                            isLoaded();
                        })                        
                    break;

                    case "e_instruction":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            e_instruction = cutTiles(e, 64);
                            isLoaded();
                        })                        
                    break;

                    case "quest_box_1":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            quest_box_1 = e
                            isLoaded();
                        })                        
                    break;

                    case "quest_box_2":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            quest_box_2 = e
                            isLoaded();
                        })                        
                    break;

                    case "sound_button_on":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            sound_button_on = e;
                            isLoaded();
                        })                        
                    break;

                    case "sound_button_off":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            sound_button_off = e;
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

                    case "panda_head":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            panda_head = e;
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

                    case "backToMenu_hover":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            backToMenu_hover = e;
                            isLoaded();
                        })                        
                    break;

                    case "backToMenu_main":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            backToMenu_main = e;
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
                            shamisen_4 = e;
                            isLoaded();
                        })                        
                    break;

                    case "inventory_empty":
                        loadImage(elm.path, (e) => {
                            numberAssetsLoading += 1 ;
                            inventory_empty = e;
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

        //! set up tileset player
        playerTileSet = [animTop,animBottom,animLeft,animRight, animIDLETop, animIDLEBottom, animIDLELeft, animIDLERight, animBackflip ];

        //! set up tileset PNJ
        pandaTileSet = [pandaAnimIdleRight,pandaAnimRight,pandaAnimIdleLeft,pandaAnimLeft,pandaAnimIdleBottom,pandaAnimIdleTop];
        pnjTileSet2 = [pnjAnimTop2,pnjAnimBottom2,pnjAnimLeft2,pnjAnimRight2];
        pnjTileMasaruFather = [MasaruFatherAnimRightIdle,MasaruFatherAnimRight,MasaruFatherAnimLeftIdle,MasaruFatherAnimLeft,MasaruFatherAnimBottomIdle,MasaruFatherAnimTopIdle]
        leopardTileSet = [leopard_right_idle,leopard_right, leopard_left_idle, leopard_left,leopard_bottom_idle,leopard_top_idle]
        deerTileSet = [deerAnimIdleRight,deerAnimRight,deerAnimIdleLeft,deerAnimLeft,deerAnimIdleBottom,deerAnimIdleTop];

        //! set up tileset shamisen
        spriteSheetShamisen = [allTiles[0],shamisen_1,shamisen_2,shamisen_3,shamisen_4]

        //! set up tile engine 2
        tilesetEngine2 = journalTiles
        imageBackgroundEng2 = imageBackgroundEng2Parchemin

        
        //! set up inventory
        inventoryContent = [null,null,null,null,null];
        
        //! set up pnj
        createPNJ()
        
        //! end loading
        assetsLoaded = true;

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

    xStartWorld1 = - coordMap[1] * nbColumn * sideCarrousel - startWorldX
    yStartWorld1 = - coordMap[0] * nbRow * sideCarrousel - startWorldY

    console.log('%c coord : ', 'background: #222; color: #FFFF00',  xStartWorld1, yStartWorld1, " START WITH VALUE : currentMap") 
}










