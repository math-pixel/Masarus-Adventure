let btnPlay;
let btnSetting;
let btnCredit;

function startMenu(){
    // background(0,0,0);

    image(background_ui,0,0,1000,578)
    

    fill("#000000");
    textAlign(CENTER);

    //! titre
    image(logo,1000 / 2 - 248 * 2 / 2, 50 , 248 * 2, 81 * 2);

    //! menu
    // Play
    image(play_button, 1000 / 2 - 300 / 2, 220 + 60);
    // Setting
    image(setting_button, 1000 / 2 - 300 / 2, 300 + 60);
    // Credit
    image(credit_button, 1000 / 2 - 300 / 2, 380 + 60);


    actionOnText([1000 / 2 - 300 / 2,220 + 60,300,60], "engine1", play_button_hover)
    actionOnText([1000 / 2 - 300 / 2,300 + 60,300,60], "settingMenu", settings_button_hover)
    actionOnText([1000 / 2 - 300 / 2,380 + 60,300,60], "creditMenu", credit_button_hover)
}


function pauseMenu(){

    //! draw background
    image(background_ui,0,0,1000,578)

    //! draw instruction image
    image(imageInstruction, 1000 / 2 - 294 / 2 , 60 , 294 , 365)

    //! draw continue button
    image(continue_button, 1000 / 2 - 300 / 2 , 450)

    //! draw music button
    if(useAudio){
        image(sound_button_on, 950,20, 32 , 32)
    }else{
        image(sound_button_off, 950,20, 32 , 32)
    }
    actionOnText([950,20 ,32,32], "changeAudio", "")

    actionOnText([1000 / 2 - 300 / 2 , 450 ,300,60], lastEngine, continue_button_hover)

}

function settingMenu(){
    //! draw background
    image(background_ui,0,0,1000,578)

    //! draw instruction image
    image(imageInstruction, 1000 / 2 - 294 / 2 , (578 / 2) - (365 / 2) , 294 , 365)


    //! draw reutrn button
    image(backToMenu_main, 20,20 , 160,40)

    //! draw music button
    if(useAudio){
        image(sound_button_on, 950,20, 32 , 32)
    }else{
        image(sound_button_off, 950,20, 32 , 32)
    }

    actionOnText([20,20 ,160,40], "startMenu", backToMenu_hover)

    actionOnText([950,20 ,32,32], "changeAudio", "")
}


function creditMenu(){
    //! draw background
    image(background_ui,0,0,1000,578)

    //! draw instruction image
    text("credit", 1000 / 2 - 294 / 2 , (578 / 2) - (365 / 2) , 294 , 365)


    //! draw reutrn button
    image(backToMenu_main, 20,20 , 160,40)

    actionOnText([20,20 ,160,40], "startMenu", backToMenu_hover)
}

function actionOnText(textRect, action, hoverImage){

    // console.log(action)

    // underline text on hover
    if (pointIsInRect([mouseX,mouseY], textRect)) {
        // fill(0,0,0);
        // noStroke()
        // rect(textRect[0] - 5 , textRect[1] + textRect[3] + 2 , textRect[2] + 10, 5  )

        if (hoverImage != "") {
            image(hoverImage, textRect[0], textRect[1], textRect[2], textRect[3]);
        }


        if (mouseIsPressed === true){

            //! change engine
            switch(action){
                case "engine1":
                // engine = "engine1"
                setUpTransition(50, "engine1")
                break;
            case "engine2":
                engine = "engine1"
                break;
            case "startMenu":
                // engine = "startMenu"
                setUpTransition(4, "startMenu")
                break;
            case "pauseMenu":
                // engine = "pauseMenu"
                setUpTransition(4, "pauseMenu")
                break;
            case "settingMenu":
                // engine = "settingMenu"
                setUpTransition(4, "pauseMenu")
                break;
            case "creditMenu":
                // engine = "creditMenu"
                setUpTransition(4, "pauseMenu")
                break;
            case "changeAudio":
                setTimeout((e)=>{
                    useAudio = !useAudio
                }, 1000)
                break;
            case "reverseQuestBox":
                setTimeout((e)=>{
                    questBoxIsEmpty = !questBoxIsEmpty
                }, 50)
                break
            default:
                throw new Error("engine error")
            }
            
        }


    }
}