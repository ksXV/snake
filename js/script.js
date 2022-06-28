"use strict";
var _a;
let gamePiece;
let gameWalls;
function startGame() {
    gameSettings.start();
    gameSettings.canvas.focus();
    gameWalls = new CreateEmptyRectangle(0, 0, gameSettings.canvas.width, gameSettings.canvas.height, "black");
    gamePiece = new CreateRectangle(50, 50, 25, 25, "red");
    gameSettings.canvas.addEventListener("keypress", checkForKeyBoardKeyPresses);
}
const checkForKeyBoardKeyPresses = (e) => {
    switch (e.key) {
        case "w":
            gamePiece.y -= gamePiece.height;
            break;
        case "a":
            gamePiece.x -= gamePiece.width;
            break;
        case "s":
            gamePiece.y += gamePiece.height;
            break;
        case "d":
            gamePiece.x += gamePiece.width;
            break;
        default:
            break;
    }
};
class gameSettings {
    //first number is the number of REM's we want and second number is the number of pixels
    static start() {
        this.canvas.width = 25 * 16;
        this.canvas.height = 25 * 16;
        this.canvas.tabIndex = 1;
        this.canvas.style.border = "1px solid black";
        document.body.appendChild(this.canvas);
        //this updates our game
        this.interval = setInterval(updateGame, 3600 / 30);
    }
    static clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    static stop() {
        clearInterval(this.interval);
    }
}
_a = gameSettings;
gameSettings.canvas = document.createElement("canvas");
gameSettings.context = _a.canvas.getContext("2d");
class CanvasPiecePosition {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
//creates a rectangle or generates a game piece
class CreateRectangle extends CanvasPiecePosition {
    constructor(x, y, width, height, color) {
        super(x, y, width, height);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.ctx = gameSettings.context;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }
    update() {
        this.ctx = gameSettings.context;
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
//creates empty rectangle or the game walls
class CreateEmptyRectangle extends CanvasPiecePosition {
    constructor(x, y, width, height, color) {
        super(x, y, width, height);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.ctx = gameSettings.context;
        this.ctx.fillStyle = color;
        this.ctx.strokeRect(x, y, width, height);
    }
}
gameSettings.start();
gamePiece = new CreateRectangle(50, 50, 100, 100, "red");
//this is the function that changes the position of the game pieces
function updateGame() {
    gameSettings.clear();
    gamePiece.update();
}
startGame();
