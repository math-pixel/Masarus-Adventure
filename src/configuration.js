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


// cam 
const Xcam = xStartWorld1 + 75;
const Ycam = yStartWorld1 + 150;

//perso
var xPlayer = 500;
var yPlayer = 500;


function initVariableWorld(){
    sideCarrousel = worlds1.sizeCarrousel;

    for (let index = 0; index < 1; index++) {
        ArrayWorldDisplay.push(worlds1[Object.keys(worlds1)[index]])
    }

    console.log(ArrayWorldDisplay)
}

