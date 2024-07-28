// Getting all references
const drawingCanvas = document.querySelector("#drawingCanvas");
const drawingCanvasContext = drawingCanvas.getContext('2d');

// Menu settings references
var menuOpen = true;
const menu = document.getElementById("settingsMenu");
const penRadiusSlider = document.getElementById("penRadius");
const penRadiusValue = document.getElementById("penRadiusValue");

const rSlider = document.getElementById("r");
const rSliderValue = document.getElementById("rValue");

const gSlider = document.getElementById("g");
const gSliderValue = document.getElementById("gValue");

const bSlider = document.getElementById("b");
const bSliderValue = document.getElementById("bValue");

const colorPreview = document.getElementById("currentColor");

if(window.wiiu)
    var drcState = window.wiiu.gamepad.update();

var currentPenRadius = 25;
// Drawing Eracing Picker
// 0       1       2
var mode = 0;

setInterval(draw, 0);

function draw()
{
    if(window.wiiu)
        drcState = window.wiiu.gamepad.update();

    penRadiusValue.value = penRadiusSlider.value;
    currentPenRadius = penRadiusSlider.value;

    colorPreview.height = 32;

    rSliderValue.value = rSlider.value;
    gSliderValue.value = gSlider.value;
    bSliderValue.value = bSlider.value;

    //document.getElementById("touch").innerHTML = wiiu.gamepad.tpX + " " + wiiu.gamepad.tpY + " " + button(0x00000100);

    // Toggles menu
    if(button(0x00000400) == 1 && window.wiiu)
    {
        menuOpen = true;
    }
    else
    {
        menuOpen = false;
    }
    colorPreview.style.backgroundColor = getColor();

    showMenu();

    if(wiiu.gamepad.tpTouch == 1 && !menuOpen && window.wiiu)
    {
        if(mode == 0)
        {
            drawMode();
        }
        else if(mode == 1)
        {
            eraceMode();
        }
        else if(mode == 2)
        {
            getColorMode();
        }
    }
    else
    {
        drawingCanvasContext.beginPath();
    }
    
}

function drawMode()
{
    drawingCanvasContext.globalCompositeOperation = "source-over";
    drawingCanvasContext.strokeStyle = getColor();
    
    drawingCanvasContext.lineWidth = currentPenRadius;
    drawingCanvasContext.lineCap = "round";

    drawingCanvasContext.lineTo(wiiu.gamepad.tpX, wiiu.gamepad.tpY-35 + (10 * 0.5));
    drawingCanvasContext.stroke();
    drawingCanvasContext.beginPath();
    drawingCanvasContext.moveTo(wiiu.gamepad.tpX, wiiu.gamepad.tpY-35 + (10 * 0.5));
}

function eraceMode()
{
    drawingCanvasContext.globalCompositeOperation = "destination-out";

    drawingCanvasContext.lineWidth = currentPenRadius;
    drawingCanvasContext.lineCap = "round";

    drawingCanvasContext.lineTo(wiiu.gamepad.tpX, wiiu.gamepad.tpY-35 + (10 * 0.5));
    drawingCanvasContext.stroke();
    drawingCanvasContext.beginPath();
    drawingCanvasContext.moveTo(wiiu.gamepad.tpX, wiiu.gamepad.tpY-35 + (10 * 0.5));
}

function getColorMode()
{
    var data = drawingCanvasContext.getImageData(wiiu.gamepad.tpX, wiiu.gamepad.tpY-35 + (10 * 0.5), 1, 1).data;
    rSlider.value = data[0];
    gSlider.value = data[1];
    bSlider.value = data[2];
    //var newColor = "#" + ("000000" + rgbToHex(data[0], data[1], data[2])).slice(-6);
}

function rgbToHex(r, g, b)
{
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

function setMode(newMode)
{
    mode = newMode;
}

function saveDrawingCanvas()
{
    alert("Saving...");
    var canvasSaveData = drawingCanvas.toDataURL();
    document.cookie = "saveData=" + canvasSaveData + "; expires=Sun, 31 Dec 2023 12:00:00 UTC"; 
    alert(document.cookie);
}

function clearDrawingCanvas()
{
    alert("Cleared canvas!");
    drawingCanvasContext.clearCanvas(0, 0, drawingCanvas.width, drawingCanvas.height);
}

function getColor()
{
    var r_hex = parseInt(rSliderValue.value, 10).toString(16),
        g_hex = parseInt(gSliderValue.value, 10).toString(16),
        b_hex = parseInt(bSliderValue.value, 10).toString(16),
        hex = "#" + pad(r_hex) + pad(g_hex) + pad(b_hex); 
    return hex;
}

function switchMode()
{
    isDrawing = !isDrawing;

    if(isDrawing)
    {
        drawModeButton.value = "Drawing";

    }
    else
    {
        drawModeButton.value = "Eracing";
    }
}

function pad(n)
{
    return (n.length<2) ? "0"+n : n;
}

function showMenu()
{
    if (menuOpen)
    {
        menu.style.display = "block";
    }
    else 
    {
        menu.style.display = "none";
    }
}

function button(buttonId)
{
    return wiiu.gamepad.hold & buttonId ? 1: 0;
}

/*/ Wii U test
if(window.wiiu)
{
    document.write("Wii U!");
}
else
{
    document.write("Not Wii U.");
}*/