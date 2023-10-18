let rows = 30;
let cols = 30;
let squareSize = 30;
let squares = [];
let squares2 = [];
let anchorColors = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    anchorColors = [
        color(81, 48, 169),
        color(208, 143, 239),
        color(24, 176, 138),
        color(255, 252, 169)
    ];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let x = j * squareSize + squareSize / 2;
            let y = i * squareSize + squareSize / 2;
            let square = new Square(x, y, squareSize);
            squares.push(square);
            squares2.push(square);
        }
    }
}

function draw() {
    clear();
    for (let i = 0; i < squares.length; i++) {
        let square = squares[i];
        square.update(mouseX, mouseY, anchorColors);
        square.display();
    }
}

class Square {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color(random(255), random(255), random(255), random(255));
    }

    update(mx, my, anchorColors) {
        
        let distance =  ((this.y/my)*10)*((this.x/mx)*10)//dist(this.y, this.x, mx,  my,  );
        let distance2 = [(this.y/my)/10, (this.x/mx)/2]
        let colorValue = map(distance*2, 0, width, distance2[0], distance2[1]);
        this.color = lerpColor(anchorColors[2], anchorColors[3], colorValue);
        // if ((this.color.equals(anchorColors[2]) && this.color.levels[3] === 255) || 
        // (this.color.equals(anchorColors[3]) && this.color.levels[3] === 255)) {
        // this.color = color(0, 0, 0, 0);
    //}
        // if ((this.x+distance > mx+distance && this.y+distance > my+distance) || 
        // (this.x+distance < mx+distance && this.y+distance < my+distance)) {
        //     this.color = lerpColor(anchorColors[0], anchorColors[1], colorValue);
        // }
    }

    display() {
        push();
        translate(this.x, this.y);
        fill(this.color);
        rectMode(CENTER);
        rect(0, 0, this.size, this.size);
        pop();
    }

}