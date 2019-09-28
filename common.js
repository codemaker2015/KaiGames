function playSound(sound){
    var audio = new Audio('sounds/' + sound + '.mp3');
    audio.play();
}

function writeText(text) {
    ctx.font = "30px Monospace";
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
}

function writePoints(text) {
    ctx.font = "12px Monospace";
    ctx.textAlign = "left";
    ctx.fillText(text, 12, canvas.height);
}

function writeSubText(text) {
    ctx.font = "20px Monospace";
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 30);
}

function writeScore(text) {
    ctx.font = "20px Monospace";
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width / 2, 20);
}

var initialSeconds = Math.floor(Date.now() / 1000)

function writeTime() {
    var seconds = Math.floor(Date.now() / 1000) - initialSeconds;
    ctx.font = "12px Monospace";
    ctx.textAlign = "right";
    ctx.fillText(seconds, canvas.width - 12, canvas.height);
}

function clearCanvas(canvas, canvasContext) {
	canvasContext.clearRect(0, 0, canvas.width, canvas.height);
}

var controls = {
    rightPressed: false,
    leftPressed: false,
    upPressed: false,
    downPressed: false
}

//Listening websocket events
var ws = new WebSocket("ws://localhost:2203");
var datas = "";
//Websocket communication
if ("WebSocket" in window) {
    //if(!isConnection)
        //console.log("WebSocket is supported by your Browser!");

    // Let us open a web socket
    ws.onopen = function() {
        // Web Socket is connected, send data using send()
        ws.send('{ "type": "authentication", "moduleId": "bricks", "moduleSecret": "qwerty" }');
        ws.send('{ "type":"setCapabilities", "kaiId": "default", "pyrData": true }');
        console.log("Message is sent...");
    };

    //setInterval(function(){
        ws.onmessage = function (evt) { 
            datas = evt.data;
            console.log("Message is received..." + datas);
            doMove();
        };
    //},200);


    ws.onclose = function(event) { 
        // websocket is closed.
        alert("Connection is closed...\nEnable your Kai Sensor and SDK"); 
        // if (event.wasClean) {
        //     alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        //   } else {
        //     alert('[close] Connection died');
        //   }
    };

    ws.onerror = function(error) {
        alert(`[error] ${error.message}`);
    };
} else {
    // The browser doesn't support WebSocket
    alert("WebSocket NOT supported by your Browser!");
} 

function doMove(){
    //For Jumping
    if(datas != ""){
        var obj = JSON.parse(datas);
        if(obj.type == "incomingData"){      
            if(obj.data[0].type == "pyrData"){ 
                if(obj.data[0].roll < -40){ //Moving left
                    controls.leftPressed = true;
                }else  if(obj.data[0].roll > 40){ //Moving right
                    controls.rightPressed = true;
                }else if(obj.data[0].pitch > 20){ //Moving down
                    controls.downPressed = true;
                }else if(obj.data[0].pitch < -40){ //Moving up
                    controls.upPressed = true;
                }else{
                    controls.rightPressed = false;
                    controls.leftPressed = false;
                    controls.downPressed = false;
                    controls.upPressed = false; 
                }
            }
        }
    }
}

console.log("listening to arrows");
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
    if (e.keyCode == 39 || e.keyCode == 68) {
        controls.rightPressed = true;
    }
    else if (e.keyCode == 37 || e.keyCode == 65) {
        controls.leftPressed = true;
    }
    else if (e.keyCode == 38 || e.keyCode == 87) {
        controls.upPressed = true;
    }
    else if (e.keyCode == 40 || e.keyCode == 83) {
        controls.downPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.keyCode == 39 || e.keyCode == 68) {
        controls.rightPressed = false;
    }
    else if (e.keyCode == 37 || e.keyCode == 65) {
        controls.leftPressed = false;
    }
    else if (e.keyCode == 38 || e.keyCode == 87) {
        controls.upPressed = false;
    }
    else if (e.keyCode == 40 || e.keyCode == 83) {
        controls.downPressed = false;
    }
}