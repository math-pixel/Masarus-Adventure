var world1 
let worlds1 =[]

function loadAsset(){
    // load all JSON FILE
    world1 = loadJSON("../JSON/world.json", (e)=>{
        
    });
    worlds1 = loadJSON("../JSON/allMaps.json", (e)=> {
        initVariableWorld();
    });
}


//moteur de jeu
var engine = "engine1";

// map
var ArrayWorldDisplay = [];

var xStartWorld1 = 250;
var yStartWorld1 = 250;

let currentWorld = "tour";

//perso
var xPlayer = 500;
var yPlayer = 500;

// cam 
const Hcam = 100;
const Wcam = Hcam * (16/9);
const Xcam = ( xPlayer + 20 / 2) -  Wcam/2;
const Ycam = (yPlayer + 20 / 2) - Hcam/2;



function initVariableWorld(){
    sideCarrousel = worlds1.sizeCarrousel;

    for (let index = 0; index < 1; index++) {
        ArrayWorldDisplay.push(worlds1[Object.keys(worlds1)[index]])
    }

    console.log(ArrayWorldDisplay)
}

