const sketch = new p5((p) => {
    // Get window width and height
    const width = p.windowWidth;
    const height = p.windowHeight;
  
    // p5 setup function
    p.setup = () => {
      const sketchRef = document.getElementById('sketch-container'); // replace 'sketch-container' with the ID of your parent element
      p.createCanvas(width, height).parent(sketchRef);
  
      p.noStroke();
      for (let i = 0; i < 1000; i++) {
        balls.push(new Ball(p));
      }
    };
  
    const balls = [];
    const sphereRadius = window.innerWidth / 8;
  
    // p5 draw function
    p.draw = () => {
      for (let ball of balls) {
        ball.update();
        ball.checkCollision();
        ball.display();
      }
    };
  
    class Ball {
      constructor(p) {
        const r = window.innerWidth / 8;
        const theta = p.random(p.TWO_PI);
        const phi = p.random(p.PI);
        const x = r * p.cos(phi) * p.cos(theta);
        const y = r * p.cos(phi) * p.sin(theta);
        const z = r * p.sin(phi);
        this.pos = p.createVector(x, y, z);
        const angle = p.random(p.TWO_PI);
        this.vel = p5.Vector.fromAngle(angle).mult(p.random(0.3, 1.5));
        this.size = p.random(0.5, 5);
      }
  
      update() {
        const r = window.innerWidth / 8;
        const theta = p.map(this.pos.x, -r, r, 0, p.TWO_PI);
        const phi = p.map(this.pos.y, -r, r, 0, p.PI);
        const sphereX = r * p.cos(phi) * p.cos(theta);
        const sphereY = r * p.cos(phi) * p.sin(theta);
        const sphereZ = r * p.sin(phi);
        const distance = p.dist(this.pos.x, this.pos.y, this.pos.z, sphereX, sphereY, sphereZ);
        if (distance > r) {
          const targetX = sphereX + (this.pos.x - sphereX) * r / distance;
          const targetY = sphereY + (this.pos.y - sphereY) * r / distance;
          const targetZ = sphereZ + (this.pos.z - sphereZ) * r / distance;
          this.pos.set(targetX, targetY, targetZ);
        } else {
          const angle = p.atan2(this.pos.y - sphereY, this.pos.x - sphereX);
          const targetX = sphereX + p.cos(angle) * (r + this.size / 2);
          const targetY = sphereY + p.sin(angle) * (r + this.size / 2);
          const targetZ = sphereZ;
          this.pos.set(targetX, targetY, targetZ);
        }
        this.pos.add(this.vel);
      }
  
      display() {
        p.fill(p.random(255), 150, p.random(255));
        p.ellipse(this.pos.x, this.pos.y, this.size);
      }
  
      checkCollision() {
        const r = window.innerWidth / 8;
        const theta = p.map(this.pos.x, -r, r, 0, p.TWO_PI);
        const phi = p.map(this.pos.y, -r, r, 0, p.PI);
        const sphereX = r * p.cos(phi) * p.cos(theta);
        const sphereY = r * p.cos(phi) * p.sin(theta);
        const sphereZ = r * p.sin(phi);
        const distance = p.dist(this.pos.x, this.pos.y, this.pos.z, sphereX, sphereY, sphereZ);
        if (distance < this.size / 2) {
          const angle = p.atan2(this.pos.y - sphereY, this.pos.x - sphereX);
          const targetX = sphereX + p.cos(angle) * (r + this.size / 2);
          const targetY = sphereY + p.sin(angle) * (r + this.size / 2);
          const targetZ = sphereZ;
          this.pos.set(targetX, targetY, targetZ);
        }
      }
    }
  });