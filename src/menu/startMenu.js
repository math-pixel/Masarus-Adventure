let btnPlay;
let btnSetting;
let btnCredit;

function menu(){
    // background(0,0,0);

    image(background_ui,0,0,1000,578)
    

    fill("#000000");
    textAlign(CENTER);
    textFont(fontGravityBold);

    //titre
    // textSize(50);
    // text("Masaru's Adventure", 500, 220 - 40);
    image(logo,1000 / 2 - 248 * 2 / 2, 50 , 248 * 2, 81 * 2);

    //menu
    textSize(20);
    // text('Play', 500, 220 + 60);
    image(play_button, 1000 / 2 - 207 / 2, 220 + 60);
    // text('Setting', 500, 300 + 60);
    image(setting_button, 1000 / 2 - 207 / 2, 300 + 60);
    // text('Credit', 500, 380 + 60);
    image(credit_button, 1000 / 2 - 207 / 2, 380 + 60);


    // let btnPlay = fontGravityBold.textBounds('Play', 500, 220 + 60, 20)
    // let btnSetting = fontGravityBold.textBounds('Setting', 500, 300 + 60, 20)
    // let btnCredit = fontGravityBold.textBounds('Credit', 500, 380 + 60, 20)
    
    // console.log([btnPlay.x,btnPlay.y,btnPlay.w,btnPlay.h])
    actionOnText([1000 / 2 - 207 / 2,220 + 60,207,42], "engine1")
    actionOnText([1000 / 2 - 207 / 2,300 + 60,207,42], "engine1")
    actionOnText([1000 / 2 - 207 / 2,380 + 60,207,42], "engine1")
}


function actionOnText(textRect, nextEngine){

    // underline text on hover
    if (pointIsInRect([mouseX,mouseY], textRect)) {
        fill(0,0,0);
        noStroke()
        rect(textRect[0] - 5 , textRect[1] + textRect[3] + 2 , textRect[2] + 10, 5  )

        if (mouseIsPressed === true){
            switch(nextEngine){
                case "engine1":
                    engine = nextEngine;
                    break;
                case "engine2":
                    engine = nextEngine;
                    break;
                case "engine3":
                    engine = nextEngine;
                    break;
                default:
                    throw new Error("wrong engine set in menu")
            }
        }


    }
}