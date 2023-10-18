let r = 200;

let density;
let densitySlider;

let thetaMax, phiMax;
let thetaMaxSlider, phiMaxSlider;

function setup() {
  createCanvas(700, 700, WEBGL); //size(600, 400)¨
  angleMode(DEGREES); //radians()
  colorMode(HSB); //RGB, 255

  stroke(251, 0, 0);
  strokeWeight(3);
  noFill();

  thetaMax = createDiv();
  thetaMaxSlider = createSlider(0, 360, 360, 10); //min, max, default, stepSize

  phiMax = createDiv();
  phiMaxSlider = createSlider(0, 180, 180, 0); //min, max, default, stepSize

  density = createDiv();
  densitySlider = createSlider(3, 62, 24, 1); //min, max, default, stepSize
}

function draw() {
  background(0, 100, 100);
  orbitControl(4, 4);

  normalSphere();
 
  thetaMax.html("Theta Max value: " + thetaMaxSlider.value());
  phiMax.html("Phi Max value: " + phiMaxSlider.value());

  let displayDensity = int(map(densitySlider.value(), 3, 62, 1, 60));
  density.html("Density value: " + displayDensity);
}

function normalSphere(){
    for (
        let phi = 0;
        phi < phiMaxSlider.value();
        phi += 180 / densitySlider.value()
      ) {
        beginShape(POINTS);
        for (
          let theta = 0;
          theta < thetaMaxSlider.value();
          theta += 180 / densitySlider.value()
        ) {
          let x = r * cos(phi);
          let y = r * sin(phi) * sin(theta);
          let z = r * sin(phi) * cos(theta);
          vertex(x, y, z);
        }
        endShape();
      }
}
