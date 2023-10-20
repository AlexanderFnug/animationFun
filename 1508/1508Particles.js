const sketch = new p5((p) => {
  let width = p.windowWidth; // Get window width
  let height = p.windowHeight; // Get window height
  // p5 setup function
  p.setup = () => {
    const sketch = document.getElementById('sketch-container'); // replace 'sketch-container' with the ID of your parent element
    p.createCanvas(width, height).parent(sketch);

    p.noStroke();
    for (let i = 0; i < 1000; i++) {
      balls.push(new Ball(p));
    }
  };
  const balls = [];
  const sphereRadius = window.innerWidth / 8;
  // p5 draw function
  p.draw = () => {
    p.background(251, 99, 78, 1)
    // p.background(251, 99, 78, 1)
    for (let ball of balls) {
      ball.update();
      ball.checkCollision();
      ball.display();
    }
  };
  setTimeout(() => {
    console.log("X: "+p.mouseX+" Y: "+p.mouseX );
  }, 5000);

  class Ball {
    constructor() {
      this.pos = p.createVector(p.random(p.width), p.random(p.height));
      const angle = p.random(p.TWO_PI); // Random angle between 0 and 2*PI
      this.vel = p5.Vector.fromAngle(angle).mult(p.random(0.3, 1)); // Create a vector from the angle
      this.size = p.random(0.5, 5);
    }

    update() {
      let angle = p.atan2(p.mouseY - this.pos.y, p.mouseX - this.pos.x);
      if (p.mouseY < 100 || p.mouseY > height-100) {
        this.vel = p5.Vector.fromAngle(
          -angle * (p.mouseX - p.mouseY)
        ).mult(this.vel.mag()); // Keep the speed consistent
        this.pos.add(this.vel);
      }
      if (p.mouseX < 50 || p.mouseX > width-100) {
        this.vel = p5.Vector.fromAngle(
          -angle * (p.mouseY + p.mouseX)
        ).mult(this.vel.mag()); // Keep the speed consistent
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
    
   

    checkCollision() {
      const distance = p.dist(
        this.pos.x,
        this.pos.y,
        p.width / 2,
        p.height / 2
      );
      if (distance < sphereRadius + this.size / 2) {
        const angle = p.atan2(
          this.pos.y - p.height / 2,
          this.pos.x - p.width / 2
        );
        const targetX =
          p.width / 2 + p.cos(angle) * (sphereRadius + this.size / 2);
        const targetY =
          p.height / 2 + p.sin(angle) * (sphereRadius + this.size / 2);

        this.pos.x = targetX;
        this.pos.y = targetY;
      }
    }
  }
});

