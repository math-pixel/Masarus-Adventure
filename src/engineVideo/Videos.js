function vidsEnd(){
    //! video outro 
    vidOutro.play()
    image(vidOutro, 0,0, 1000,578)

    setTimeout(() => {
        if (engine != "endScreen") {
            setUpTransition(4, "endScreen")
        }
    }, 38000)
}

function vidsOpening(){
    //! video intro
    vidIntro.play()
    image(vidIntro, 0,0, 1000,578)

    setTimeout(() => {
        if (engine != "engine1") {
            setUpTransition(4, "engine1")
        }
    }, 34000)
    // 34000

}