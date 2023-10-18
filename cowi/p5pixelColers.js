let squares = [];
let colors = [color(24, 176, 138), color(255, 252, 169)];
let currentColor = 0;

function setup() {
    createCanvas(400, 400);
    noStroke();
    rectMode(CENTER);
    for (let i = 0; i < 12; i++) {
        squares.push({
            x: random(width),
            y: random(height),
            size: 30,
            alpha: 0,
            sparkle: 0
        });
    }
}

function draw() {
    background(0);
    for (let i = 0; i < squares.length; i++) {
        let square = squares[i];
        fill(colors[currentColor]);
        square.alpha = lerp(square.alpha, 255, 0.05);
        square.sparkle = lerp(square.sparkle, 0, 0.1);
        fill(red(colors[currentColor]), green(colors[currentColor]), blue(colors[currentColor]), square.alpha + square.sparkle);
        rect(square.x, square.y, square.size, square.size);
    }
}

function mouseMoved() {
    for (let i = 0; i < squares.length; i++) {
        let square = squares[i];
        let d = dist(mouseX, mouseY, square.x, square.y);
        if (d < 50) {
            square.alpha = 255;
            square.sparkle = 50;
        }
    }
}

function mouseClicked() {
    currentColor = (currentColor + 1) % colors.length;
}
