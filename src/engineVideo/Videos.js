function vidsEnd(){
    //! video outro 
    vidOutro.play()
    image(vidOutro, 0,0, 1000,578)

    setTimeout(() => {
        if (engine != "endScreen") {
            setUpTransition(38000, "endScreen")
        }
    }, 2000)
}

function vidsOpening(){
    //! video intro
    vidIntro.play()
    image(vidIntro, 0,0, 1000,578)

    setTimeout(() => {
        if (engine != "engine1") {
            setUpTransition(34000, "engine1")
        }
    }, 2000)

}