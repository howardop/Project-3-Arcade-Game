"use strict"

// This version is a rewrite of the original app.js but using the new ES6 Class construct

// Create a global event that is dispatched when a new game is to be started.  This event will 
// be listened for in engine.js.  It is listened for here because that is where the game loop
// is defined.
const startNewGameEvent = new Event('startNewGame');

// Global Constants
const numEnemies = 3;

// Enemies our player must avoid
class Enemy {
    constructor(xStart, yStart, speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        // xStep and yStep indicate how much to move for each arrow click
        // These values have the player move from box to box on each click  
        // Note: Enemy can only move horizontally
        this.xStep = 101,
            this.yStep = 83;

        // Dimensions of enemy-bug.png.  
        this.width = 101;
        this.height = 171;

        // These margins are used to check for collisions 
        this.widthMargin = 3 * this.width / 8;
        this.heightMargin = 3 * this.height / 8;

        this.leftBorder = 0;
        this.rightBorder = 4 * this.xStep;
        this.topBorder = 0;
        this.bottomBorder = 5 * this.yStep - 30;

        // Define starting position someplace in the grass
        this.xStart = xStart;
        this.yStart = yStart + 6;

        this.x = this.xStart;
        this.y = this.yStart;

        this.speed = speed;
    };

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if (this.x < this.rightBorder * 1.2) {
            this.x += this.speed * dt;
        } else {
            this.x = -this.xStep;
        };
    };

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for the player, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/char-pink-girl.png';

        // xStep and yStep indicate how much to move for each arrow click
        // These values have the player move from box to box on each click
        this.xStep = 101;
        this.yStep = 83;

        this.leftBorder = 0;
        this.rightBorder = 4 * this.xStep;
        this.topBorder = 0;
        this.bottomBorder = 5 * this.yStep - 30;

        // Define starting position someplace in the grass
        this.xStart = this.xStep * 2;
        this.yStart = this.yStep * 5 - 30;

        // Define property to indicate player crossed the road successfully
        this.gameOver = false;


        this.x = this.xStart;
        this.y = this.yStart;
    };

    // Update() is used to check for both collisions and wins the  
    update() {
        for (let enemy of allEnemies) {
            // First check if player and enemy are on the same y-axis
            // Check position of player against approximate width of enemy
            if (this.y > enemy.y - (enemy.heightMargin) && this.y < enemy.y + (enemy.heightMargin) &&
                // And now check that player and enemy are on same x axis
                this.x < enemy.x + (enemy.widthMargin) && this.x > enemy.x - (enemy.widthMargin)) {
                console.log('Collision!');
                this.reset();
            }
        }

        // No collision.  Check for Win
        if (this.y < this.yStep / 2) {
            console.log('Yay!  I won');
            this.gameOver = true;
        }
    }

    // Reset the player after a collision or win
    reset() {
        this.x = this.xStart;
        this.y = this.yStart;
    }

    // Draw the player on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    // Change the player's position based on the input key pressed
    handleInput(key) {
        switch (key) {
            case 'enter': // Start new game
                // The enter key is not valid during a game
                if (this.gameOver) {
                    document.dispatchEvent(startNewGameEvent);
                }
                break;
            case 'left':
                if (this.x > this.leftBorder) {
                    this.x -= this.xStep;
                };
                break;
            case 'right':
                if (this.x < this.rightBorder) {
                    this.x += this.xStep;
                };
                break;
            case 'up':
                if (this.y > this.topBorder) {
                    this.y -= this.yStep;
                };
                break;
            case 'down':
                if (this.y < this.bottomBorder) {
                    this.y += this.yStep;
                };
                break;
        }
    }

}

// Now instantiate your objects.
// Place the player object in a variable called player
let player = new Player();

// Place all enemy objects in an array called allEnemies
//let allEnemies = [new Enemy(0,50, 100), new Enemy(50, 130, 150), new Enemy(100, 90, 250)];
let allEnemies = [];
for (let i = 0; i < numEnemies; i++) {
    // Enemy constructor requires x & y coordinates and speed
    allEnemies.push(new Enemy(random(0, 400), random(50, 250), random(100, 300)));
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        13: 'enter', // Indicates that new game should be started
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Used to randomize position and speed of enemy pieces at start of game
function random(min, max) {
    let number = min + Math.floor(Math.random() * (max - min));
    return number;
}