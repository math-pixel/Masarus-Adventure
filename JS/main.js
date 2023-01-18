grid = [
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0]
]

let sideCarrousel = 50;

let xMap = 100;
let yMap = 10;

let xPerso = grid.length * sideCarrousel / 2 - sideCarrousel / 2 + xMap;
let yPerso = grid.length * sideCarrousel / 2 - sideCarrousel / 2 + yMap;

let coordCurrentMap;

let MapGrid = new MapGame(xMap,yMap,grid,sideCarrousel);//startx,starty,Array2D,sideCarrousel
let MainPlayer = new Player(xPerso,yPerso);

let arrayMap = [];

let GlobalMap;
let indexMapActu;


function preload() {
  GlobalMap = loadJSON("../File_JSON/Global_map.json", (e) => {
     indexMapActu = FindIndexOf2dArray(e.Map, "floor_1")
  });
}

function FindIndexOf2dArray(array, value){
  for (let row = 0; row < array[0].length; row++) {
    for (let column = 0; column < array.length; column++) { 
      if (array[column][row] === value) {
        return [column,row]
      }
    }
}
}

function setup() {
  createCanvas(windowWidth, windowHeight);


  coordCurrentMap = MapGrid.GridCoordMap;
  MainPlayer.setGridCoord(coordCurrentMap);
}


function CanAddMap(){
  let indexCornerTopLeft = MainPlayer.whichCaseInGrid(xMap + (xMap + grid.length * sideCarrousel) / 10, yMap + (yMap + grid.length * sideCarrousel) /4.5, grid);
  let indexCornerBottomRight = MainPlayer.whichCaseInGrid(xMap + (xMap + grid.length * sideCarrousel) / 10 + 8 * sideCarrousel, yMap + (yMap + grid.length * sideCarrousel) /4.5 + 6 * sideCarrousel, grid);

  if (indexCornerTopLeft != null) {
    if (indexCornerTopLeft[0] == 0){
      console.log("left")
      console.log(GlobalMap.Map[indexMapActu[0]][indexMapActu[1]-1])
    }
    if (indexCornerTopLeft[1] == 0) {
      console.log("haut")
    }
  }

  if (indexCornerBottomRight != null) {
    if (indexCornerBottomRight[0] == grid.length-1){
      console.log("right")
    }
    if (indexCornerBottomRight[1] == grid.length-1) {
      console.log("bottom")
    }
  }
}
  
function draw(){
  background(220);

  fill(255,0,0);


  MapGrid.drawMap();
  coordCurrentMap = MapGrid.GridCoordMap;
  MainPlayer.setGridCoord(coordCurrentMap);


  MainPlayer.drawPlayer();
  CanAddMap();  



  fill(0,255,0,80)
  ellipse(xMap + (xMap + grid.length * sideCarrousel) / 10 + 8 * sideCarrousel, yMap + (yMap + grid.length * sideCarrousel) /4.5 + 6 * sideCarrousel , 10)

  rect(xMap + (xMap + grid.length * sideCarrousel) / 10, yMap + (yMap + grid.length * sideCarrousel) /4.5, 8 * sideCarrousel ,6 * sideCarrousel)
}


// creer 
  




