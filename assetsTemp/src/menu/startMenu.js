let btnPlay;
let btnSetting;
let btnCredit;

function menu(){
    background(0,0,0);


    

    fill(255,255,255);
    textAlign(CENTER);
    textFont(fontGravityBold);

    //titre
    textSize(50);
    text("Masaru's Adventure", 500, 220 - 40);

    //menu
    textSize(20);
    text('Play', 500, 220 + 60);
    text('Setting', 500, 300 + 60);
    text('Credit', 500, 380 + 60);

    let btnPlay = fontGravityBold.textBounds('Play', 500, 220 + 60, 20)
    let btnSetting = fontGravityBold.textBounds('Setting', 500, 300 + 60, 20)
    let btnCredit = fontGravityBold.textBounds('Credit', 500, 380 + 60, 20)
    
    // console.log([btnPlay.x,btnPlay.y,btnPlay.w,btnPlay.h])
    actionOnText([btnPlay.x,btnPlay.y,btnPlay.w,btnPlay.h], "engine1")
    actionOnText([btnSetting.x,btnSetting.y,btnSetting.w,btnSetting.h], "engine1")
    actionOnText([btnCredit.x,btnCredit.y,btnCredit.w,btnCredit.h], "engine1")
}


function actionOnText(textRect, nextEngine){

    // underline text on hover
    if (pointIsInRect([mouseX,mouseY], textRect)) {
        fill(255,255,255);
        noStroke()
        rect(textRect[0] - 5 , textRect[1] + textRect[3] + 2 , textRect[2] + 10, 5  )

        if (mouseIsPressed === true){
            switch(nextEngine){
                case "engine1":
                    engine = "engine1";
                    break;
                case "engine2":
                    engine = "engine1";
                    break;
                case "engine3":
                    engine = "engine1";
                    break;
                default:
                    throw new Error("wrong engine set in menu")
            }
        }


    }
}