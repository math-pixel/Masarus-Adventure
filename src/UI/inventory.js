let ofsetCaseInventoryX = 19
let ofsetCaseInventoryY = 18
let caseGap = 11.5




function drawInventory(xstart,ystart,sideRectInventory){

    let lengthInventory = inventoryContent.length + 1
    let sideBackgroundInventoryX = sideRectInventory * lengthInventory + ofsetCaseInventoryX;
    let sideBackgroundInventoryY = sideRectInventory + ofsetCaseInventoryY * 2
    
    globalSideInventoryX = 420;
    globalSideInventoryY = 100;
    
    //! draw background inventory
    image(inventory_empty, xstart, ystart, 420, 100 )//sideBackgroundInventoryX ,  sideBackgroundInventoryY)
    // stroke()
    inventoryContent.forEach((currentContentInventory, indexInventory) => {
        
        //! draw case background inventory
        fill("#FAEFE0")
        fill("#00000050")
        // rect(xstart + ofsetCaseInventoryX + (67 + caseGap) * indexInventory , ystart + ofsetCaseInventoryY, 67, 64, 10)

        //! draw content inventory
        if (currentContentInventory != null && currentContentInventory.image != undefined ) {
            image(currentContentInventory.image , xstart + ofsetCaseInventoryX + (67 + caseGap) * indexInventory , ystart + ofsetCaseInventoryY, 67, 64)
        }

        //! draw number inventory
        fill('#bf8b65')
        textAlign(LEFT);
        textSize(25);
        text(indexInventory + 1, xstart + ofsetCaseInventoryX + (67 + caseGap) * indexInventory + 5, ystart + ofsetCaseInventoryY + 14)

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
                        let centerPlayer = getCenterOfRect([xPlayer,yPlayer,sideCarrousel,sideCarrousel])
                        xNote = centerPlayer[0]
                        yNote = centerPlayer[1]
                    }
                }

                //! shamisen on rock but not the current quest
                if (!quests[7].isFinish && playerNearToTheRock) {
                    canInteract = true
                    textDialogue = [
                        "le shamisen n'est pas assez puissant pour detruire ces pierres"
                    ];
                    endAction = ["engine1"];
                    imagePersonTalking = [
                        masaru_head
                    ]
                    
                    //* display dialogue
                    displayDialogue = true
                    interact()
                }

                //! The rock on top of montain
                if (quests[7].isFinish && playerNearToTheRock) {

                    //? end quest 
                    quests[8].isFinish = true
                    questManager()

                    //? remome rock from interaction layer
                    Maps[tilemapTheRock].layers[layerInteraction][coordTheRockInteractive[1]][coordTheRockInteractive[0]] = blockToNotCollision

                    //? remome rock from collision layer
                    Maps[tilemapTheRock].layers[layerCollision][coordTheRockInteractive[1]][coordTheRockInteractive[0]] = blockToNotCollision

                    //? set up rock rubble to layer 2
                    Maps[tilemapTheRock].layers[1][coordTheRockInteractive[1]][coordTheRockInteractive[0]] = indexRubbleRockTile

                }

                if (quests[10].isFinish && !quests[11].isFinish) {
                    quests[11].isFinish = true
                    questManager()
                }

            break;

            case "parcheminEncode":
                // console.log("parcheminEncode")
                if (quests[1].isFinish == false) {
                    if (engine == "engine2") {
                        engine = "engine1"
                    }else if (engine == "engine1"){
                        engine = "engine2"
                    }
                }
            break;
        }
    }
    

}