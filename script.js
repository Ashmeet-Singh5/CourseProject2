// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 1000;
document.body.appendChild(canvas);

var rows = 9;
var cols = 4;

var counter = 0;

var trackRight = 1;
var trackLeft = 3;
var trackUp = 2;
var trackDown = 0;

var spriteWidth = 256;
var spriteHeight = 576;
var heroWidth = spriteWidth / cols;
var heroHeight = spriteHeight / rows;

var curXFrame = 0;
var frameCount = 4;

var srcX = 0;
var srcY = 0;

var left = false;
var right = false;
var up = false;
var down = false;

let chessBoard = [
    ['x','x','x','x','x','x','x','x','x'],
    ['x','x','x','x','x','x','x','x','x'],
    ['x','x','x','x','x','x','x','x','x'],
    ['x','x','x','x','x','x','x','x','x'],
    ['x','x','x','x','x','x','x','x','x'],
    ['x','x','x','x','x','x','x','x','x'],
    ['x','x','x','x','x','x','x','x','x'],
    ['x','x','x','x','x','x','x','x','x'],
    ['x','x','x','x','x','x','x','x','x'],
];

//SOUNDS
let soundGameOver = "sounds/gameOver.wav";
let soundCaught = "sounds/caught.wav"

//ASSIGN AUDIO TO SOUNDEFX
let soundEfx = document.getElementById("soundEfx");

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
bgReady = true;
};
bgImage.src = "images/background.jpg";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
var bananaReady = false;
var bananaImage = new Image();
bananaImage.onload = function () {
bananaReady = true;
};
bananaImage.src = "images/banana.png";

// Cactus image
var dangerReady = false;
var dangerImage = new Image();
dangerImage.onload = function () {
dangerReady = true;
};
dangerImage.src = "images/danger.png";

//top border images
var tborderReady = false;
var tborderImage = new Image();
tborderImage.onload = function() {
    tborderReady = true;
}
tborderImage.src = "images/TopBorder.jpg"

//Side border images
var sborderReady = false;
var sborderImage = new Image();
sborderImage.onload = function() {
    sborderReady = true;
}
sborderImage.src = "images/SideBorder.jpg"

// END OF IMAGES ********************************************************

//CREATE GAME OBJECTS ***************************************************
var hero = {
    speed: 256, // movement in pixels per second
    x: 0, // where on the canvas are they?
    y: 0 // where on the canvas are they?
};

var banana1 = {
    // for this version, the monster does not move, so just and x and y
    x: 250,
    y: 600
};

var banana2 = {
    // for this version, the monster does not move, so just and x and y
    x: 200,
    y: 400
};

var banana3 = {
    // for this version, the monster does not move, so just and x and y
    x: 800,
    y: 700
};

var danger1 = {
    x: 400,
    y: 300
};

var danger2 = {
    x: 300,
    y: 400
};

var danger3 = {
    x: 700,
    y: 400
};
7
//END OF GAME OBJECTS ***************************************************


//DEFINE RANDOM VARIABLES

var bananaAte = 0;
let gameOver = false;

//END OF RANDOM VARIABLES


//HANDLE KEYBOARD CONTROLS

var keysDown = {}; //object were we properties when keys go down
// and then delete them when the key goes up
// so the object tells us if any key is down when that keycode
// is down. In our game loop, we will move the hero image if when
// we go thru render, a key is down

addEventListener("keydown", function (e) {
    console.log(e.keyCode + " down")
    keysDown[e.keyCode] = true;
    }, false);

addEventListener("keyup", function (e) {
    console.log(e.keyCode + " up")
    delete keysDown[e.keyCode];
    }, false);

//END OF HANDLE KEYBOARD CONTROLS ************************************


//UPDATE GAME OBJECTS

var update = function (modifier) {

    left = false;
    right = false;
    up = false;
    down = false;

    if (38 in keysDown && hero.y > (16)) { // Player holding up
        hero.y -= hero.speed * modifier;
        up = true;
    }
    if (40 in keysDown && hero.y < canvas.height - (64 + 32)) { // Player holding down
        hero.y += hero.speed * modifier;
        down = true;
    }
    if (37 in keysDown && hero.x > (16)) { // Player holding left
        hero.x -= hero.speed * modifier;
        left = true;
    }
    if (39 in keysDown && hero.x < canvas.height - (64 + 16)) { // Player holding right
        hero.x += hero.speed * modifier;
        right = true;
    }

    // ARE THEY TOUCHING?
    if (
        hero.x <= (banana1.x + 32)
        && banana1.x <= (hero.x + 32)
        && hero.y <= (banana1.y + 32)
        && banana1.y <= (hero.y + 32)
    ) {
        ++bananaAte; // keep track of our “score”
        if (bananaAte == 5){
            soundEfx.src = soundGameOver;
            soundEfx.play();
            gameOver = true;
            soundEfx.addEventListener("ended", function(){
                alert("YOU WON!!")
            });
            reset();
        }
        else{
            soundEfx.src = soundCaught;
            soundEfx.play();
            reset();
        }
    }

    if (
        hero.x <= (banana2.x + 32)
        && banana2.x <= (hero.x + 32)
        && hero.y <= (banana2.y + 32)
        && banana2.y <= (hero.y + 32)
    ) {
        ++bananaAte; // keep track of our “score”
        if (bananaAte == 5){
            soundEfx.src = soundGameOver;
            soundEfx.play();
            gameOver = true;
            soundEfx.addEventListener("ended", function(){
                alert("YOU WON!!")
            });
            reset();
        }
        else{
            soundEfx.src = soundCaught;
            soundEfx.play();
            reset();
        }
    }

    if (
        hero.x <= (banana3.x + 32)
        && banana3.x <= (hero.x + 32)
        && hero.y <= (banana3.y + 32)
        && banana3.y <= (hero.y + 32)
    ) {
        ++bananaAte; // keep track of our “score”
        if (bananaAte == 5){
            soundEfx.src = soundGameOver;
            soundEfx.play();
            gameOver = true;
            soundEfx.addEventListener("ended", function(){
                alert("YOU WON!!")
            });
            reset();
        }
        else{
            soundEfx.src = soundCaught;
            soundEfx.play();
            reset();
        }
    }

    if (
        hero.x <= (danger1.x + 32)
        && danger1.x <= (hero.x + 32)
        && hero.y <= (danger1.y + 32)
        && danger1.y <= (hero.y + 32)
    ) {
        soundEfx.src = soundGameOver;
        soundEfx.play();
        gameOver = true; // keep track of our “score”
        soundEfx.addEventListener("ended", function(){
            alert("GAME OVER, you ran into a cactus");
        });
        reset(); // start a new cycle
    }

    if (
        hero.x <= (danger2.x + 32)
        && danger2.x <= (hero.x + 32)
        && hero.y <= (danger2.y + 32)
        && danger2.y <= (hero.y + 32)
    ) {
        soundEfx.src = soundGameOver;
        soundEfx.play();
        gameOver = true; // keep track of our “score”
        soundEfx.addEventListener("ended", function(){
            alert("GAME OVER, you ran into a cactus");
        });
        reset(); // start a new cycle
    }

    if (
        hero.x <= (danger3.x + 32)
        && danger3.x <= (hero.x + 32)
        && hero.y <= (danger3.y + 32)
        && danger3.y <= (hero.y + 32)
    ) {
        soundEfx.src = soundGameOver;
        soundEfx.play();
        gameOver = true; // keep track of our “score”
        soundEfx.addEventListener("ended", function(){
            alert("GAME OVER, you ran into a cactus");
        });
        reset(); // start a new cycle
    }
    
    if (counter == 5) {
        curXFrame = ++curXFrame % frameCount;
        counter = 0;
    }
    else{
        counter++
    }

    srcX = curXFrame * heroWidth;

    if (left) {
        srcY = trackLeft * heroHeight;
    }

    if (right) {
        srcY = trackRight * heroHeight;
    }

    if (up) {
        srcY = trackUp * heroHeight;
    }

    if (down) {
        srcY = trackDown * heroHeight;
    }

    if (left == false && right == false && up == false && down == false) {
        srcX = 1 * heroWidth;
        srcY = 2 * heroHeight;
    }

};

//THE MAIN GAME LOOP

var main = function () {
    if(gameOver == false){
    var now = Date.now();
    var delta = now - then;
    update(delta / 1000);
    render();
    then = now;
    // Request to do this again ASAP
    requestAnimationFrame(main);
}
};


//DRAW EVERYTHING IN THE MAIN RENDER FUNCTION

var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if (tborderReady && sborderReady) {
        ctx.drawImage(tborderImage, 0, 0);
        ctx.drawImage(tborderImage, 0, (1000 - 32));
        ctx.drawImage(sborderImage, 0, 0);
        ctx.drawImage(sborderImage, (1000 - 32), 0);
    }
    if (heroReady) {
        ctx.drawImage(heroImage, srcX, srcY, heroWidth, heroHeight, hero.x, hero.y, heroWidth, heroHeight);
    }
    if (bananaReady) {
        ctx.drawImage(bananaImage, banana1.x, banana1.y);
        ctx.drawImage(bananaImage, banana2.x, banana2.y);
        ctx.drawImage(bananaImage, banana3.x, banana3.y);
    }
    if (dangerReady) {
        ctx.drawImage(dangerImage, danger1.x, danger1.y)
        ctx.drawImage(dangerImage, danger2.x, danger2.y)
        ctx.drawImage(dangerImage, danger3.x, danger3.y)
    }



    // Score
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Bananas Ate: " + bananaAte, 32, 32);

}

//RESET THE GAME WHEN THE PLAYER CATCHES A MONSTER
var reset = function () {
    if(gameOver == false){

        placeItem(hero);
        placeItem(banana1);
        placeItem(banana2);
        placeItem(banana3);
        placeItem(danger1);
        placeItem(danger2);
        placeItem(danger3);

    }
};

let placeItem = function (character) {
    let X = 0;
    let Y = 0;
    let success = false;
    while(!success) {
        X = Math.floor( Math.random( ) * 9);
        Y = Math.floor( Math.random( ) * 9);

        if (chessBoard[X][Y] === 'x') {
            success = true;
        }
    }
    chessBoard[X][Y] = 'O';
    character.x = (X*100) + 32;
    character.y = (Y*100) + 32;
};


//LET'S PLAY THIS GAME!
var then = Date.now();
reset();
main(); // CALL THE MAIN GAME LOOP.