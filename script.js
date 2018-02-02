var context;
var canvas = document.getElementById("canvas");
var button = document.getElementById("button");
var x = Math.random() * 600;
var y = Math.random() * 600;;
var ballRadius = 10;
var dx = 5;
var dy = 5;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

function init() {
    context = canvas.getContext('2d');
    setInterval(draw, 25);
}

function draw() {
    context.clearRect(0, 0, 800, 600);
    drawBall();
    drawPaddle();
    if (x < 10 || x > 790) {
        dx = -dx;
    }
    if (y < 10 || y > 590) {
        dy = -dy;
    }
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    if(y + dy < ballRadius) {
        dy = -(dy);
    } else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            alert("game over");
            document.location.reload();
        }
    }
    x += dx;
    y += dy;
}

function drawBall() {
    context.beginPath();
    context.fillStyle = "black";
    context.arc(x, y, ballRadius, 0, Math.PI * 2, false);
    context.fill();
    context.closePath();
}

function drawPaddle() {
    context.beginPath();
    context.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    context.fillStyle = "black";
    context.fill();
    context.closePath();
}

button.onclick = function () {
    init();
}