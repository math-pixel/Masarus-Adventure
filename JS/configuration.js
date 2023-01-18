var fullMapWorld1 
let worlds1 =[]

function loadAsset(){
    // load all JSON FILE
    fullMapWorld1 = loadJSON("../JSON/fullMap.json");
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

var Grid;

//perso
var xPlayer = 0;
var yPlayer = 0;


function initVariableWorld(){

    for (let index = 0; index < Object.keys(worlds1).length; index++) {
        ArrayWorldDisplay.push(worlds1[Object.keys(worlds1)[index]])
    }

    console.log(ArrayWorldDisplay)
}

