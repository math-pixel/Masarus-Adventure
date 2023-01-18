var fullMapWorld1 
let worlds1 =[]

function loadAsset(){
    // load all JSON FILE
    fullMapWorld1 = loadJSON("../JSON/fullMap.json", (e)=>{
        
    });
    worlds1 = loadJSON("../JSON/WORLDS/worlds.json", (e)=> {
        initVariableWorld();
    });
}


//moteur de jeu
var engine = "engine1";

// map
var ArrayWorldDisplay = [];
var sideCarrousel = 50;
var xStartWorld1 = 50;
var yStartWorld1 = 50;

let currentWorld = "tour";


// cam 
const Xcam = xStartWorld1 + 75;
const Ycam = yStartWorld1 + 150;

//perso
var xPlayer = 700;
var yPlayer = 700;


function initVariableWorld(){

    for (let index = 0; index < Object.keys(worlds1).length; index++) {
        ArrayWorldDisplay.push(worlds1[Object.keys(worlds1)[index]])
    }

    console.log(ArrayWorldDisplay)
}

