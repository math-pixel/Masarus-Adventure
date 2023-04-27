function mapEngine(){

    let wMap = 700
    let hMap = 600
    let xMap = 1000/2 - wMap/ 2
    let yMap = 578/2 - hMap/2


    //! draw background
    image(imageBackgroundEng2, 0, 0 , 1000, 578)

    //! draw map
    image(globalmap, xMap, yMap, wMap, hMap)

    let xGMap = Math.abs(xStartWorld1)
    let yGMap = Math.abs(yStartWorld1)

    let maxXGlobal = 10500
    let maxYGlobal = 9240

    let xCursor = (xGMap * wMap ) / maxXGlobal
    let yCursor = (yGMap * hMap ) / maxYGlobal

    // console.log(xCursor)

    // fill("#000000")
    // rect(xMap +  xCursor, yCursor , 30, 30)

    image(masaru_head_map, xMap +  xCursor, yCursor , 32, 26)
}