// Getting all references
const drawingCanvas = document.querySelector("#drawingCanvas");
const drawingCanvasContext = drawingCanvas.getContext('2d');

var drcState = window.wiiu.gamepad.update();

//if(drawingCanvas)
//{
//    drawingCanvas.addEventListener("touchstart", e => {alert("weew")});
//}

setInterval(draw, 1);

function draw()
{ 
    drcState = window.wiiu.gamepad.update();
    document.getElementById("touch").innerHTML = wiiu.gamepad.tpX + " " + wiiu.gamepad.tpY;
    //document.write();
}

// Wwuhwieof
if(window.wiiu)
{
    document.write("Wii U!");
}
else
{
    document.write("Not Wii U.");
}