let btnPlay;
let btnSetting;
let btnCredit;

function menu(){
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
    actionOnText([1000 / 2 - 300 / 2,300 + 60,300,60], "engine1", settings_button_hover)
    actionOnText([1000 / 2 - 300 / 2,380 + 60,300,60], "engine1", credit_button_hover)
}


function pauseMenu(){

    //! draw background
    image(background_ui,0,0,1000,578)

    //! draw instruction image
    image(imageInstruction, 1000 / 2 - 294 / 2 , 60 , 294 , 365)


    //! draw continue button
    image(continue_button, 1000 / 2 - 300 / 2 , 450)

    actionOnText([1000 / 2 - 300 / 2 , 450 ,300,60], lastEngine, continue_button_hover)

}

function actionOnText(textRect, nextEngine, hoverImage){

    // console.log(nextEngine)

    // underline text on hover
    if (pointIsInRect([mouseX,mouseY], textRect)) {
        // fill(0,0,0);
        // noStroke()
        // rect(textRect[0] - 5 , textRect[1] + textRect[3] + 2 , textRect[2] + 10, 5  )

        image(hoverImage, textRect[0], textRect[1]);
        if (mouseIsPressed === true){

            //! change engine
            engine = nextEngine
        }


    }
}