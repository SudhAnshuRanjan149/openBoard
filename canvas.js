let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pencilColors = document.querySelectorAll(".pencil-color");
let pencilWidthElem = document.querySelector(".pencil-width");
let eraserWidthElem = document.querySelector(".eraser-width");

let download = document.querySelector(".download");
let redo = document.querySelector(".redo");
let undo = document.querySelector(".undo");

let undoRedoTracker = [];
let track = 0;

let penColor = "black";
let eraserColor = "rgba(233, 233, 233, 0.884)";
let penWidth = pencilWidthElem.value;
let eraserWidth = eraserWidthElem.value;



//********************************************** */

let mouseDown = false;

//API
let tool = canvas.getContext("2d");

tool.strokeStyle = penColor;
tool.lineWidth = penWidth;

// mousedown--> start new path , mousemove --> path fill
canvas.addEventListener("mousedown", e => {
    mouseDown = true;
    tool.beginPath();
    tool.moveTo(e.clientX,e.clientY);

})

canvas.addEventListener("mousemove", e => {
    if(mouseDown){
    tool.lineTo(e.clientX,e.clientY);
    tool.stroke();
    }
})

canvas.addEventListener("mouseup", e => {
    mouseDown = false;

    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    track = undoRedoTracker.length - 1;
})

/******************************************* */





pencilColors.forEach((colorElem) => {
    colorElem.addEventListener("click", e => {
        let color = colorElem.classList[1];
        penColor = color;
        tool.strokeStyle = penColor;
    })
})

pencilWidthElem.addEventListener("change", e => {
    penWidth = pencilWidthElem.value;
    tool.lineWidth = penWidth;
})
pencil.addEventListener("click", e => {
    if(pencilFlag){
        eraserFlag = false;
        tool.strokeStyle = penColor;
        tool.lineWidth = penWidth;
    }
})



eraserWidthElem.addEventListener("change", e => {
    eraserWidth = eraserWidthElem.value;
    tool.lineWidth = eraserWidth;
})


eraser.addEventListener("click" , e => {
    if(eraserFlag){
        pencilFlag = false;
        tool.strokeStyle = eraserColor;
        tool.lineWidth = eraserWidth;
    }
    // else{
    //     pencilFlag = true;
    //     tool.strokeStyle = penColor;
    //     tool.lineWidth = penWidth;
    // }
})


//*************** Code to download canvas *********** */

download.addEventListener("click", e => {
    let url = canvas.toDataURL();

    let a = document.createElement("a");
    a.href = url;
    a.download = "board.jpg";
    a.click();
})

//****************** Code for Undo Redo ************** */

redo.addEventListener("click", e => {
    if(track < undoRedoTracker.length-1) track++;
    //Action
    let trackObj = {
        trackValue: track,
        undoRedoTracker
    }
    undoRedoCanvas(trackObj);

})

undo.addEventListener("click" , e => {
    if(track > 0) track--;
    //Action
    let trackObj = {
        trackValue: track,
        undoRedoTracker
    }
    undoRedoCanvas(trackObj);
})


function undoRedoCanvas(trackObj){
    track = trackObj.trackValue;
    undoRedoTracker = trackObj.undoRedoTracker;

    let img = new Image(); //new image reference element
    let url = undoRedoTracker[track];
    img.src = url;
    img.onload = e =>{
        tool.drawImage(img, 0, 0, canvas.width, canvas.height);
    }

}