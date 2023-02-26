//#region 
let startX = 0;
let startY = 0;

let widthGrid = 30;
let heightGrid = 30;

let nb_row = 10; 
let nb_column = 10; 

let Grid = [];

let coordGrid;

let currentIndex = [];
let previousIndex = [];

let widthCanvas = 400;
let heightCanvas = 400;

let image_custom;
let image_path;

let reverseGrid;


let TilesSheets = [];
let valueTiles = 0;

let imgTest;

let tileSet;
let allTiles = [];

let currentTileDrawing = 0;

//#endregion
// #############################
// ########### Test ############
// #############################

// let array1 = [[0,0,0,0],
//     [1,1,0,0],
//     [0,1,0,1],
//     [0,0,1,0]]; 

// for(let row = 0; row < array1.length ; row++){
//     for(var column = 0; column < array1[row].length ; column++){
//         console.log(array1[row][column]);
//     } 
// }

// #############################
// ########### File ############
// #############################

function getFile(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            image_path = e.target.result;
            image_custom = loadImage(e.target.result);
            // console.log(typeof(image(new_image,0,0)))
        //     .attr('src', e.target.result)
        //     .width(150)
        //     .height(200);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// #############################
// ########### Event ############
// #############################


document.body.addEventListener('contextmenu', (e)=>{
    e.preventDefault();
})


document.getElementById("export").addEventListener('click',() => { // export
    let dataJSON = {
        "grille": Grid,
        "startX": startX,
        "startY": startY,
        "nbCarreauX": nb_row,
        "nbCarreauY": nb_column,
        "Side_carrer": widthGrid,
        "image_path": image_path,
        "sideXwallpaper":widthCanvas,
        "sideYwallpaper":heightCanvas,
        "reverseGride": reverseGrid
    }
    exportToJsonFile(dataJSON)
});

document.getElementById("import").addEventListener(('click') , (e)=>{
    var reader = new FileReader();

    reader.onload = function(event) {
    var jsonObj = JSON.parse(e.target.result);
    alert(jsonObj.name);
    }

    reader.readAsText(e.target.files[0]);
});

document.getElementById("nbCarreauX").addEventListener(('change') , (e)=>{
    nb_column = e.target.value;
    createGrid(nb_column, nb_row);
    feetWallpaperToGrid()
});

document.getElementById("nbCarreauY").addEventListener(('change') , (e)=>{
    nb_row = e.target.value;
    createGrid(nb_column, nb_row);
    feetWallpaperToGrid()
});

document.getElementById("SideX").addEventListener(('change') , (e)=>{
    widthGrid = parseInt(e.target.value);
    heightGrid = parseInt(e.target.value);
    feetWallpaperToGrid()
});

// document.getElementById("StartX").addEventListener(('change') , (e)=>{
//     startX = parseInt(e.target.value);
//     feetWallpaperToGrid()
// });

// document.getElementById("StartY").addEventListener(('change') , (e)=>{
//     startY = parseInt(e.target.value);
//     feetWallpaperToGrid()
// });

// document.getElementById("SideX_Wallpaper").addEventListener(('input') , (e)=>{
//     widthCanvas = parseInt(e.target.value);
//     //ResizeCanvas(widthCanvas,heightCanvas);
//     document.getElementById("text1").value = e.target.value; 
// });

// document.getElementById("SideY_Wallpaper").addEventListener(('input') , (e)=>{
//     heightCanvas = parseInt(e.target.value);
//     //ResizeCanvas(widthCanvas,heightCanvas);
//     document.getElementById("text2").value = e.target.value
// });

// document.getElementById("text1").addEventListener(('change'), (e)=>{
//     widthCanvas = e.target.value;
//     document.getElementById("SideX_Wallpaper").value = widthCanvas
//     //ResizeCanvas(widthCanvas,heightCanvas);
    
// });

// document.getElementById("text2").addEventListener(('change'), (e)=>{
//     heightCanvas = e.target.value;
//     document.getElementById("SideY_Wallpaper").value = heightCanvas
//     //ResizeCanvas(widthCanvas,heightCanvas);
// })

// document.getElementById("valueTiles").addEventListener(('change'), (e) => {
    
// })

// #############################
// ##### Export / import #######
// #############################


function exportToJsonFile(jsonData) {
    let dataStr = JSON.stringify(jsonData);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    let exportFileDefaultName = 'Collision.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}


function importData(){

}


// #############################
// ####### Setup P5.JS #########
// #############################   


function preload() {
    // image_custom = loadImage('https://cdn.shopify.com/s/files/1/0249/6376/files/pixnio_2eca23e2-54c0-416f-b8f2-10bc88368e76.jpg?v=1557631143', ()=>{}, (error)=>{console.log(error)});
    imgTest = loadImage('./img.png');
}

function setup(){
    canvas = createCanvas(2000,1000);
    createGrid(nb_column, nb_row);
    noSmooth()
    // image(image_custom, 0, 0);
}

function draw(){
    background(200);
    // image(image_custom, 0, 0);
    // image_custom.resize(widthCanvas, heightCanvas);
    
    coordGrid = drawGrid(startX, startY, widthGrid, heightGrid, nb_column, nb_row);

}


// #############################
// ########### Grid ############
// #############################

function createGrid(maxColumn, maxRow){
    Grid = [];

    for (let column = 0; column < maxColumn; column++) {
        Grid.push([]);
        for (let row = 0; row < maxRow; row++) {
            Grid[column].push(0);
            
            // console.log(Grid[row])            
        }
    }
}

function drawGrid(x,y,w,h,maxColumn, maxRow){

    console.log(typeof(widthGrid),heightGrid)

    for (let row = 0; row < maxRow; row++) {
        for (let column = 0; column < maxColumn; column++) {

            if (allTiles[Grid[column][row]]) {
                image(allTiles[Grid[column][row]], x+w*row,y+h*column, w, h)
                // console.log("yey")
            }else{
                rect(x+w*row,y+h*column,w,h);  
            }

            fill(color(255, 255, 255, 20))
            rect(x+w*row,y+h*column,w,h);       
        }
    }

    const maxWidht = w * maxRow;
    const maxHeight = w * maxColumn;
    return [x,y,x + maxWidht , y + maxHeight];
}

function clearGrid(){
    for(let row = 0; row < Grid.length ; row++){
        for(var column = 0; column < Grid[row].length ; column++){
            Grid[row][column] = 0;
        } 
    }
}

// #############################
// ########## Canvas ###########
// #############################

function ResizeCanvas(x,y){
    //ResizeCanvas(x, y, true);
}

function setCarrousel(x,y){
    console.log([x,y])
    if (mouseButton === LEFT) {
        Grid[x][y] = currentTileDrawing;
    }
    if (mouseButton === RIGHT) {
        Grid[x][y] = 0;
    }
}

function feetWallpaperToGrid(){

    widthCanvas = widthGrid * nb_row;
    heightCanvas = heightGrid * nb_column;

    // document.getElementById("SideX_Wallpaper").value = widthCanvas
    // document.getElementById("SideY_Wallpaper").value = heightCanvas

    // document.getElementById("text1").value = widthCanvas; 
    // document.getElementById("text2").value = heightCanvas; 

    //ResizeCanvas(widthCanvas,heightCanvas);
}


// #############################
// ########## Tiles ############
// #############################

function addTiles(){

}


// #############################
// ########## Mouse ############
// #############################

function mousePressed() {
        if (pointIsInside(mouseX,mouseY,coordGrid)) {
            let index = whichCaseInGrid(mouseX,mouseY);

            if (index !== undefined) {

                previousIndex = index;
                setCarrousel(index[1],index[0]);

            }
            
            
        }   
    
}

function mouseDragged() {

    if (pointIsInside(mouseX,mouseY,coordGrid)) {
        currentIndex = whichCaseInGrid(mouseX,mouseY);

        console.log(currentIndex)

        if (currentIndex !== undefined) {
            if (currentIndex[0] != previousIndex[0] || currentIndex[1] != previousIndex[1]) {

                previousIndex = currentIndex;    
                setCarrousel(currentIndex[1],currentIndex[0]);

            } 
        }
    }              
}


// #############################
// ####### Logique Click #######
// #############################


//* rectPos = [ x Depart, y Depart, x fin, y fin ] 
function pointIsInside(x,y,RectPos){
    return (x > RectPos[0] && x < RectPos[2] && y > RectPos[1] && y < RectPos[3]);
} 

function whichCaseInGrid(mouseX,mouseY){
    for (let row = 0; row < nb_row; row++) {
        for (let column = 0; column < nb_column; column++) {  
            let x = startX+widthGrid*row;
            let y = startY+heightGrid*column;

            // console.log([x,y,x + width, y + height])
            if (pointIsInside(mouseX,mouseY,[x,y,x + widthGrid, y + heightGrid])){
                
                return([row,column]);
            }         
        }
    }
}

// #############################
// ########### Tools ###########
// #############################

function displayArray(array){
    console.log(array)
    let strArray = "";

    strArray += "[";
    for (let row = 0; row < array.lenght; row++) {
        strArray += "["
        for (let column = 0; column < array[row].lenght; column++) {
            strArray += array[column][row];          
        }
        strArray += "]";
    }
    strArray += "]";

    return strArray;
}

const preview = document.getElementById('preview');
function previewFile() {
    
    const file = document.getElementById('file').files[0];
    const reader = new FileReader();
  
    reader.addEventListener("load", () => {
      // convert image file to base64 string
      preview.src = reader.result;
    //   console.log(reader.result)

      tileSet =  loadImage(`${reader.result}`)

    }, false);
  
    if (file) {
      reader.readAsDataURL(file);
    }
  }


  function needCutTile(){
    let a = document.getElementById("Pixel_Side").value

    allTiles = cutTiles(tileSet, a);

    //create ELEMENENT
    let parent = document.getElementById("parent");

    parent.innerHTML = "";

    allTiles.forEach((currentTile, index) => {
        let child = `<div class="bloc"><input type="text" value="${index}" id="valueTiles"><img src="${currentTile.canvas.toDataURL()}" alt="${index}" class="img_visualization" onclick="selectTile(parseInt(this.alt))"><button class="TileSelected" id="TileSelected" value="${index}" onclick="selectTile(parseInt(this.value))">Select Tiles</button></div>`
        parent.innerHTML += child
    })
  }

  function cutTiles(image, tilesSize) {
    let tilesArray = []
    const tilesNumberWidth = image.width / tilesSize
    const tilesNumberHeigth = image.height / tilesSize
    for (let h = 0; h < tilesNumberHeigth; h++) {
        for (let w = 0; w < tilesNumberWidth; w++) {
            let newTile;
            newTile = image.get(w * tilesSize, h * tilesSize, tilesSize, tilesSize)
            // console.log(newTile)
            tilesArray.push(newTile)
        }
    }
    return tilesArray
}

function selectTile(currentTile){
    currentTileDrawing = currentTile;

    document.getElementById("currentTileImg").src = allTiles[currentTile].canvas.toDataURL()
}


// function cutImage(img){
//     let tileSizeCut = document.getElementById("Pixel_Side").value
//     let a = assets.get(0, 0, tileSizeCut, tileSizeCut) ;

// }