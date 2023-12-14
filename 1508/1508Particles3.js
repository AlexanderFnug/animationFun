const sketch = new p5((p) => {
  let width = p.windowWidth; // Get window width
  let height = p.windowHeight; // Get window height
  const balls = [];
  const sphereRadius = window.innerHeight/6;
  let frameCounter = 0;

  // p5 setup function
  p.setup = () => {
    const sketch = document.getElementById("sketch-container"); // replace 'sketch-container' with the ID of your parent element
    p.createCanvas(width, height).parent(sketch);
    p.noStroke();
    for (let i = 0; i < 1500; i++) {
      balls.push(new Ball(p));
    }
  };

  // p5 draw function
  p.draw = () => {
    p.clear();
    for (let ball of balls) {
      ball.update();
      if (frameCounter % 120 === 0) {
        ball.spreadOut(balls, 50, 100); // Decrease maxDensity and increase areaSize
      }
      ball.display();
    }
    frameCounter++;
  };

  class Ball {
    constructor() {
      this.pos = p.createVector(p.random(p.width), p.random(p.height));
      const angle = p.random(p.TWO_PI); // Random angle between 0 and 2*PI
      this.vel = p5.Vector.fromAngle(angle).mult(p.random(0.3, 1)); // Create a vector from the angle
      this.size = p.random(0.5, 8);
    }

    update() {
      const distance = p.dist(p.mouseX, p.mouseY, this.pos.x, this.pos.y);
      let angle = p.atan2(p.mouseY - this.pos.y, p.mouseX - this.pos.x);
      if (distance <= sphereRadius) {
        this.vel = p5.Vector.fromAngle(-angle * (p.mouseY + p.mouseX)).mult(
            p.random(0.8, 1.3)
        );
        this.pos.add(this.vel);
      } else {
        this.vel = p5.Vector.fromAngle(angle).mult(this.vel.mag()); // Keep the speed consistent
        this.pos.add(this.vel);
      }
    }

    display() {
      p.fill(0);
      p.ellipse(this.pos.x, this.pos.y, this.size);
    }

    spreadOut(balls, maxDensity, areaSize) {
      let nearbyBalls = balls.filter(ball => 
        p.dist(this.pos.x, this.pos.y, ball.pos.x, ball.pos.y) < areaSize
      );

      if (nearbyBalls.length > maxDensity) {
        let angle = p.random(p.TWO_PI);
        let magnitude = p.map(nearbyBalls.length, maxDensity, balls.length, 0.3, 2);
        this.vel = p5.Vector.fromAngle(angle).mult(magnitude);
      }
    }
  }
});