//! set up text array like ["Hello", "world"]
let textDialogue = [];
let endAction = "";
let imagePersonTalking = "";


//variable for cut the text
let indexInDialogue = 0;
let indexInText = 0;
let dialogueToDisplay = "";

let isCuttingWord = false;
let isFirstInteraction = true;


function startEngineDialogue(){
    cutText()
    
    //draw text
    // fill(255,255,255)
    // rect(50,25,800,50) 
    image(backgroud_dialogue_box, 1000 / 2 - 800 / 2, 578 - ( sideCarrousel + 30 ) , 800 , sideCarrousel + 20 )
    
    
    fill(0,0,0)
    textSize(35);
    textLeading(27)

    if (imagePersonTalking[indexInDialogue] != "") {
        textAlign(LEFT);
        textFont(fontTypeCast);
        image(imagePersonTalking[indexInDialogue], 680 , 390 ,sideCarrousel * 2.5, sideCarrousel * 2.5 )
        text(dialogueToDisplay, 1000 / 2 - 800 / 2 + 25,  578 - ( sideCarrousel + 30 ) + 14.7, 550, 500)
        fill(255,0,0)
    }else{
        textAlign(CENTER);
        textFont(fontTypeCastItalic);
        text(dialogueToDisplay, 1000 / 2 ,  578 - ( sideCarrousel + 30 ) + 50)
    }

    if (frameRatePlayer % 30 === 0) {
        if (currentFrameEinstruction +1 == e_instruction.length) {
            currentFrameEinstruction = 0
        }else{
            currentFrameEinstruction += 1
        }
    }
    image(e_instruction[currentFrameEinstruction], 855, 578 - 50, 32, 32)
    
    
}

function cutText(){
    
    //split text
    if (indexInText < textDialogue[indexInDialogue].length) {
        isCuttingWord = true
        dialogueToDisplay = textDialogue[indexInDialogue].split("", Math.round(indexInText)).join('')
        indexInText += 0.5;
        
        
        // end of text spliting => prepare to the next text
        if (indexInText >= textDialogue[indexInDialogue].length){
            isCuttingWord = false
            
            console.log("next")
        }
    }
    
}

function interact(){

    // undisplay shamisen
    displayShamisen = false
    canMove = false;

    //* if the gameur interact during the text is already cutting
    if (isCuttingWord) {
        
        //* set fully text
        indexInText = textDialogue[indexInDialogue].length - 1
        console.log(indexInText)
        
    }else if(!isFirstInteraction && !isCuttingWord && indexInDialogue < textDialogue.length - 1){

        //* si ce n'est pas le dernier message a dire alors vas au message suivant
        indexInDialogue += 1
        indexInText = 0
        
    }else if(isFirstInteraction && !isCuttingWord){
        
        //*if is first interact do nothing => draw first message
        isFirstInteraction = false;

    }else{

        //* else do the request action and reset variable
        isFirstInteraction = true
        indexInDialogue = 0
        indexInText = 0
        canInteract = false

        //! end dialogue
        engine = endAction[0]
        
        // reset variable
        displayDialogue = false
        displayShamisen = true
        canMove = true

        //! next action
        // console.log(endAction)
        if (endAction.length > 1) {
            for (let index = 1; index < endAction.length; index++) {
                doActionGameplay(endAction[index])
            }
            
        } 
    }
}


function doActionGameplay(endAction){
    switch(endAction){

        case "endQuest0":
            displayShamisen = true
            currentSpriteShamisen = 1
            if (canAddToInventory({"name" : "shamisen" , "image": allTiles[24]})) {
                addToInventory({"name" : "shamisen" , "image": allTiles[24]})
            }

            //! advencement in quest
            quests[0].isFinish = true
            questManager()
        break;

        case "addRopeToShamisen":
            currentSpriteShamisen += 1
            console.log(currentSpriteShamisen)
        break;

        case "endQuest2":
            //* quest finish recuperer corde
            quests[2].isFinish = true
            questManager()
        break;

        case "endQuest3":
            //* quest finish recuperer corde
            quests[3].isFinish = true
            questManager()
        break;

        case "endQuest5":
            //* quest parler au pnj 3 et nous indique l'endroit de la corde
            quests[5].isFinish = true
            questManager()

            removeToInventory({"name" : "eventail" , "image": allTiles[28]})
        break;

        case "startDialogueQuest7":
            //? in questSystem.js
            dialogueQuest7()
        break;

        case "displayQuest7":
            quests[7].beDisplayed = true
            questManager()
        break;

        case "endQuest7":
            quests[7].isFinish = true
            questManager()
        break;

        case "endQuest10":
            quests[10].isFinish = true
            questManager()

            canMove = false
        break;

        case "endGame":

            // draw last animation
            setUpTransition(4, "vidsEnd")
        break;

    }
}