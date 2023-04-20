let ofsetCaseInventoryX = 10
let ofsetCaseInventoryY = 10
let caseGap = 1.2




function drawInventory(xstart,ystart,sideRectInventory){

    let lengthInventory = inventoryContent.length + 1
    let sideBackgroundInventoryX = sideRectInventory * lengthInventory + ofsetCaseInventoryX;
    let sideBackgroundInventoryY = sideRectInventory + ofsetCaseInventoryY * 2
    
    globalSideInventoryX = sideBackgroundInventoryX;
    globalSideInventoryY = sideBackgroundInventoryY;
    
    //! draw background inventory
    image(backgroud_dialogue_box, xstart, ystart, sideBackgroundInventoryX ,  sideBackgroundInventoryY)
    // stroke()
    inventoryContent.forEach((currentContentInventory, indexInventory) => {
        
        //! draw case background inventory
        fill("#FAEFE0")
        rect(xstart + ofsetCaseInventoryX + indexInventory * sideRectInventory * caseGap, ystart + ofsetCaseInventoryY, sideCarrousel, sideCarrousel, 10)

        //! draw content inventory
        if (currentContentInventory != null && currentContentInventory.image != undefined ) {
            image(currentContentInventory.image , xstart + ofsetCaseInventoryX + indexInventory * sideRectInventory * caseGap, ystart + ofsetCaseInventoryY , sideRectInventory,sideRectInventory)
        }

        //! draw number inventory
        fill('#4c2512')
        textAlign(LEFT);
        textSize(25);
        text(indexInventory + 1, xstart + ofsetCaseInventoryX + indexInventory * sideRectInventory * caseGap + 5, ystart + ofsetCaseInventoryY + 14)

    })
}

function inventoryIsEmpty(){
    
    for (let index = 0; index < inventoryContent.length; index++) {

        if (inventoryContent[index] === null) {

            return true

        }
    }

    return false
}

function inventoryAlreadyHaveObject(object){
    for (let index = 0; index < inventoryContent.length; index++) {

        if (inventoryContent[index] !== null) {
            
            if (inventoryContent[index].name === object.name) {
                return true
            }

        }
    }

    return false
}


function canAddToInventory(objectToAdd){

    //! verification if there is a place for object
    if(inventoryIsEmpty()){

        //!verification not yet object
        if (!inventoryAlreadyHaveObject(objectToAdd)) {
            
            if (objectToAdd.name != undefined && objectToAdd.image != undefined) {

                return true
            
            }else{

                console.error("lobject a ajouter a linventaire ne contient pas d'attribut image ou name")
                return false

            }

        }else{

            return false
            //TODO dialogue object already in inventory

        }


    }else{

        return false
        //TODO dialogue inventory is full

    }

}


function addToInventory(objectToAdd){

    for (let index = 0; index < inventoryContent.length; index++) {
        // console.log(inventoryContent)
        if (inventoryContent[index] == null) {
            inventoryContent[index] = objectToAdd
            //TODO dialogue you have get a new object
            break;
        }
        
    }

}

function removeToInventory(objectToRemove){

    for (let index = 0; index < inventoryContent.length; index++) {

        if (inventoryContent[index] !== null) {

            if (inventoryContent[index].name === objectToRemove.name) {
                inventoryContent[index] = null
            }

        }
        
    }
}

function updateObjectInInventory(lastObject,newObject){
    for (let index = 0; index < inventoryContent.length; index++) {

        if (inventoryContent[index] !== null) {

            if (inventoryContent[index].name === lastObject.name) {

                if (canAddToInventory(newObject)) {
                    inventoryContent[index] = newObject
                }
                
            }

        }
        
    }
}

function useObject(indexOfCase){
    console.log("use Inventory")

    if (inventoryContent[indexOfCase] != null) {
        switch(inventoryContent[indexOfCase].name){

            case "shamisen":
                
                //! si il a  parler au pnj et recuperer la premiere corde alors le shamisen joue une note de musique
                if (quests[2].isFinish === true && !quests[3].isFinish) {
                    if (lifeTimeNote == 0) {
                        lifeTimeNote = 100
                        xNote = xPlayer
                        yNote = yPlayer
                    }
                }
            break;

            case "parcheminEncode":
                // console.log("parcheminEncode")
                if (engine == "engine2") {
                    engine = "engine1"
                }else if (engine == "engine1"){
                    engine = "engine2"
                }
            break;
        }
    }
    

}