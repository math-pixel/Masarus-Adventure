let btnPlay;
let btnSetting;
let btnCredit;

function startMenu(){
    // background(0,0,0);

    image(vidBackgroundUi,0,0,1000,578)

    fill("#FFFFFF80")
    rect(0,0,1000,578)
    

    fill("#000000");
    textAlign(CENTER);

    //! titre
    image(logo, (1000 / 2) - (248 * 1.8 / 2) , 70 , 248 * 1.8, 81 * 1.8);

    //! menu
    // Play
    image(play_button, 1000 / 2 - 300 / 2, 220 + 35);
    // Setting
    image(setting_button, 1000 / 2 - 300 / 2, 300 + 35);
    // Credit
    image(credit_button, 1000 / 2 - 300 / 2, 380 + 35);


    actionOnText([1000 / 2 - 300 / 2 ,220 + 35,300,60], "vidsOpening", play_button_hover)
    actionOnText([1000 / 2 - 300 / 2 ,300 + 35,300,60], "settingMenu", settings_button_hover)
    actionOnText([1000 / 2 - 300 / 2 ,380 + 35,300,60], "creditMenu", credit_button_hover)
}


function pauseMenu(){

    //! draw background
    image(vidBackgroundUi,0,0,1000,578)
    fill("#FFFFFF80")
    rect(0,0,1000,578)

    //! draw instruction image
    image(imageInstruction, 1000 / 2 - 294 / 2 , 40 , 294 , 400)

    //! draw continue button
    image(continue_button, 1000 / 2 - 300 / 2 , 460)

    //! draw music button
    // if(useAudio){
    //     image(sound_button_on, 950,20, 32 , 32)
    // }else{
    //     image(sound_button_off, 950,20, 32 , 32)
    // }
    // actionOnText([950,20 ,32,32], "changeAudio", "")

    actionOnText([1000 / 2 - 300 / 2 , 460 ,300,60], lastEngine, continue_button_hover)

}

function settingMenu(){
    //! draw background
    image(vidBackgroundUi,0,0,1000,578)
    fill("#FFFFFF80")
    rect(0,0,1000,578)

    //! draw instruction image
    image(imageInstruction, 1000 / 2 - 348 / 2 , (578 / 2) - (502 / 2) , 348 , 502)


    //! draw reutrn button
    image(backToMenu_main, 20,20)

    //! draw music button
    // if(useAudio){
    //     image(sound_button_on, 950,20, 32 , 32)
    // }else{
    //     image(sound_button_off, 950,20, 32 , 32)
    // }

    actionOnText([20,20 ,100,18], "startMenu", backToMenu_hover)

    // actionOnText([950,20 ,32,32], "changeAudio", "")
}

function clickStart(){
    fill("#222222")
    rect(0,0,1000,578)

    fill("#000")
    text("click !", 455, 300)

    if(mouseIsPressed === true){
        setTimeout(() => {
            setUpTransition(25, "startMenu")
        }, 150)
    }
}


function creditMenu(){
    
    //! draw background
    image(vidBackgroundUi,0,0,1000,578)
    fill("#FFFFFF80")
    rect(0,0,1000,578)

    //! draw reutrn button
    image(backToMenu_main, 20,20)

    //! draw text
    image(credit_text, 0,0, 1000,578)
    
    actionOnText([20,20 ,100,18], "startMenu", backToMenu_hover)
}

function actionOnText(textRect, action, hoverImage){

    // console.log(action)

    // underline text on hover
    if (pointIsInRect([mouseX,mouseY], textRect)) {

        cursor("pointer")
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
                setUpTransition(15, "startMenu")
                break;
            case "pauseMenu":
                // engine = "pauseMenu"
                setUpTransition(15, "pauseMenu")
                break;
            case "settingMenu":
                // engine = "settingMenu"
                setUpTransition(15, "settingMenu")
                break;
            case "creditMenu":
                // engine = "creditMenu"
                setUpTransition(15, "creditMenu")
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
            case "vidsOpening":
                setUpTransition(4, "vidsOpening")
                break;
            default:
                throw new Error("engine error")
            }
            
        }


    }
}