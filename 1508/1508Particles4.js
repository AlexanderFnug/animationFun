const sketch = new p5((p) => {
    let width = p.windowWidth; // Get window width
    let height = p.windowHeight; // Get window height
    const balls = [];
    const sphereRadius = 150;
    const spinTime = 500; // Time in milliseconds to start spinning
    let lastSpinTime = 0; // Last time a ball started spinning
    let spinSpeed = 0.01; // Speed of the spin
    // p5 setup function
    p.setup = () => {
        const sketch = document.getElementById("sketch-container"); // replace 'sketch-container' with the ID of your parent element
        p.createCanvas(width, height).parent(sketch);
        p.noStroke();
        for (let i = 0; i < 1000; i++) {
            balls.push(new Ball(p));
          }
    };

    // p5 draw function
    p.draw = () => {
        p.clear();
        for (let ball of balls) {
            ball.update();
            ball.display();
        }
    };

    // p5 mouseClicked function
    p.mouseClicked = () => {
        const numBalls = 35;
        const radius = 300;
        const center = p.createVector(p.mouseX, p.mouseY);
        for (let i = 0; i < numBalls; i++) {
            const angle = p.map(i, 0, numBalls, 0, p.TWO_PI);
            const pos = p.createVector(
                center.x + p.cos(angle) * radius,
                center.y + p.sin(angle) * radius
            );
            balls.push(new Ball(p, pos));
        }
    };

    class Ball {
        constructor(p, pos) {
          this.pos = pos || p.createVector(p.random(p.width), p.random(p.height));
          const angle = p.random(p.TWO_PI); // Random angle between 0 and 2*PI
          this.vel = p5.Vector.fromAngle(angle).mult(p.random(1, 5)); // Create a vector from the angle
          this.size = p.random(0.5, 5);
          this.isSpinning = false; // Whether the ball is currently spinning
          this.spinStartTime = 0; // Time when the ball started spinning
          this.spinRadius = 0; // Radius of the spinning circle
          this.spinCenter = p.createVector(p.mouseX, p.mouseY); // Center of the spinning circle
          this.spinAngle = 0; // Current angle of the ball on the spinning circle
          this.spinSpeed = p.random(0.01, 0.1); // Speed of the spin
          this.spinDirection = p.random([-1, 1]); // Direction of the spin
          this.radius = p.random(0, sphereRadius); // Random radius between 0 and sphereRadius
        }
      
        update() {
          const distance = p.dist(p.mouseX, p.mouseY, this.pos.x, this.pos.y);
          let angle = p.atan2(p.mouseY - this.pos.y, p.mouseX - this.pos.x);
          if (distance <= this.radius) {
            if (!this.isSpinning && p.millis() - lastSpinTime >= spinTime) {
              this.isSpinning = true;
              this.spinStartTime = p.millis();
              this.spinRadius = p.random(sphereRadius*0.1, sphereRadius);
              this.spinCenter = p.createVector(p.mouseX, p.mouseY);
            }
            if (this.isSpinning) {
              this.spinAngle += this.spinDirection * this.spinSpeed;
              this.pos.x =
                this.spinCenter.x + p.cos(this.spinAngle) * this.spinRadius;
              this.pos.y =
                this.spinCenter.y + p.sin(this.spinAngle) * this.spinRadius;
            }
          } else {
            this.isSpinning = false;
            this.vel = p5.Vector.fromAngle(angle).mult(this.vel.mag());
            this.pos.add(this.vel);
          }
        }
      
        display() {
          p.fill(0);
          p.ellipse(this.pos.x, this.pos.y, this.size);
        }
      }
});