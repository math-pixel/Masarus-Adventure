let world1 
let Maps =[]

function loadAsset(){
    // load all JSON FILE
    world1 = loadJSON("../JSON/world.json", (e)=>{
        
    });
    Maps = loadJSON("../JSON/allMaps.json", (e)=> {
        initVariableWorld(e);
    });
}


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

// cam 
const Hcam = 100;
const Wcam = Hcam * (16/9);
const Xcam = ( xPlayer + 20 / 2) -  Wcam/2;
const Ycam = (yPlayer + 20 / 2) - Hcam/2;

const rectCam = [Xcam,Ycam,Xcam + Wcam, Ycam +Hcam]



function initVariableWorld(e){
    sideCarrousel = e.sizeCarrousel;

    nbRow = e.nbRow;
    nbColumn = e.nbColumn;

    for (let index = 0; index < 1; index++) {
        ArrayWorldDisplay.push(Maps[Object.keys(Maps)[index]])
    }

    console.log(ArrayWorldDisplay)
}

