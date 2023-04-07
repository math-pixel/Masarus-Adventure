let ofsetCaseInventoryX = 10
let ofsetCaseInventoryY = 10
let caseGap = 1.2




function drawInventory(xstart,ystart,sideRectInventory){

    let lengthInventory = inventoryContent.length + 1
    let sideBackgroundInventoryX = sideRectInventory * lengthInventory + ofsetCaseInventoryX * 2;
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
    })
}



function canAddToInventory(objectToAdd){


    return true

     //!verification not yet object
     for (let index = 0; index < inventoryContent.length; index++) {

        if (inventoryContent[index].image !== null) {
            
            if (inventoryContent[index].image !== objectToAdd.image) {
                return true
            }
        }
    }

    // //! verification if there is a place for object
    // for (let index = 0; index < inventoryContent.length; index++) {
    //     if (inventoryContent[index] === null) {

    //         //TODO dialogue you already have this object
    //         console.log("%c plus de place dans l'inventaire", "red")
    //         return false

    //     }
    // }

    //TODO dialogue cant add to inventory
    return false
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

    // console.log(inventoryContent)
}