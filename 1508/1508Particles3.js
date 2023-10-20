const sketch = new p5((p) => {
  let width = p.windowWidth; // Get window width
  let height = p.windowHeight; // Get window height
  const balls = [];
  const sphereRadius = 60;
  // p5 setup function
  p.setup = () => {
    const sketch = document.getElementById("sketch-container"); // replace 'sketch-container' with the ID of your parent element
    p.createCanvas(width, height).parent(sketch);
    p.noStroke();
    for (let i = 0; i < 3000; i++) {
      balls.push(new Ball(p));
    }
  };

  // p5 draw function
  p.draw = () => {
    p.clear();
    for (let ball of balls) {
      ball.update();
      //ball.checkCollision();
      ball.display();
    }
  };

  class Ball {
    constructor() {
      //this.pos = p.createVector(p.random(p.width*0.25,p.width*0.75), p.random(p.height*0.25,p.height*0.75));
      this.pos = p.createVector(p.random(p.width), p.random(p.height));
      const angle = p.random(p.TWO_PI); // Random angle between 0 and 2*PI
      this.vel = p5.Vector.fromAngle(angle).mult(p.random(0.3, 1)); // Create a vector from the angle
      this.size = p.random(0.5, 5);
    }

    update() {
      const distance = p.dist(p.mouseX, p.mouseY, this.pos.x, this.pos.y);
      let angle = p.atan2(p.mouseY - this.pos.y, p.mouseX - this.pos.x);
      if (distance <= sphereRadius) {
        
        this.vel = p5.Vector.fromAngle(-angle * (p.mouseY + p.mouseX)).mult(
            p.random(0.5, 1)
        );
        this.pos.add(this.vel);
      }
  
      else {
         // Keep the speed consistent
         this.vel = p5.Vector.fromAngle(angle).mult(this.vel.mag()); // Keep the speed consistent
         this.pos.add(this.vel);
      }
      
    }
    
    display() {
      p.fill(0);
      p.ellipse(this.pos.x, this.pos.y, this.size);
    }

    // checkCollision() {
    //   const distance = p.dist(
    //     this.pos.x,
    //     this.pos.y,
    //     p.width / 2,
    //     p.height / 2
    //   );
    //   if (distance < sphereRadius + this.size / 2) {
    //     const angle = p.atan2(
    //       this.pos.y - p.height / 2,
    //       this.pos.x - p.width / 2
    //     );
    //     const targetX =
    //       p.width / 2 + p.cos(angle) * (sphereRadius + this.size / 2);
    //     const targetY =
    //       p.height / 2 + p.sin(angle) * (sphereRadius + this.size / 2);

    //     this.pos.x = targetX;
    //     this.pos.y = targetY;
    //   }
    // }
  }
});
