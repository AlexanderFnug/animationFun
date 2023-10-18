let rows = 30;
let cols = 30;
let squareSize = 30;
let squares = [];
let squares2 = [];
let anchorColors = [];
let circleOpacity = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  anchorColors = [
    color(81, 48, 169),
    color(208, 143, 239),
    color(24, 176, 138),
    color(255, 252, 169),
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
    // Draw the static circle in the top right corner
    push();
    translate(width - 50, 50);
    fill(lerpColor(anchorColors[2], anchorColors[3], circleOpacity));
    ellipse(0, 0, 50, 50);
    pop();
    
    // Update and display the squares2
    for (let i = 0; i < squares2.length; i++) {
        let square2 = squares2[i];
        square2.update2(mouseY, mouseX, anchorColors);
        square2.display();
    }
    
    // Update and display the squares1 on top of squares2
    for (let i = 0; i < squares.length; i++) {
        let square = squares[i];
        let square2 = squares2[i];
        square.update(mouseX / 2, mouseY, anchorColors);
        square.display();
        push();
        translate(square2.x, square2.y);
        fill(square2.color);
        rectMode(CENTER);
        rect(0, 0, squareSize, squareSize);
        pop();
    }
    
    // Update the circle opacity based on the mouse position
    let distance = dist(mouseX, mouseY, width - 50, 50);
    circleOpacity = map(distance, 0, width / 2, 0, 1);
}

class Square {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color(random(255), random(255), random(255), random(255));
  }

  update(mx, my, anchorColors) {
    let distance = ((this.y / my) * 10) * ((this.x / mx) * 10); //dist(this.y, this.x, mx,  my,  );
    let distance2 = [this.y / my / 10, this.x / mx / 2];
    let colorValue = map(distance * 2, 0, width, distance2[0], distance2[1]);
    if(this.y < height && this.x < width) {
        let fade = map((this.y+this.x), 500, 1000, 255, 0, true)
        this.color = color(255, 252, 169, fade);
    } else {
        let fade = map((this.y+this.x), 0, (width+height), 0, 255, true)
        this.color = color(24, 176, 138, fade);
    }
    //this.color = lerpColor(anchorColors[2], color(0, 0, 0, 0), colorValue);
  }

  update2(mx, my, anchorColors) {
    let distance = dist(width-100, 50, mx,  my,  );
    let distance2 = [this.y / my / 10, this.x / mx / 2];
    let colorValue = map(distance, 0, width/2, 0, 1);
    this.color = lerpColor( anchorColors[3], color(0,0,0,0), colorValue);
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
