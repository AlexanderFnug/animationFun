
console.log('blurGridMove.js loaded');
const p5Container = document.querySelector("#p5-container");
console.log('HEJ: ',p5Container);
// Create 400 divs to create a 20x20 grid
for (let i = 0; i < 200; i++) {
    const div = document.createElement("div");
    div.classList.add("grid-square");
    p5Container.appendChild(div);
}

function setup() {
    let width = p5Container.clientWidth;
    let height = p5Container.clientHeight;
    let cnv = createCanvas(width, height);
    cnv.parent(p5Container);
     svg = document.querySelector('svg');
    
}
function draw() {
    // Get the mouse position
    let mouseXPercent = mouseX / width;
    let mouseYPercent = mouseY / height;

    // Set the new position of the SVG circle
    let newCX = map(mouseXPercent, 0, 1, 800, 1200);
    let newCY = map(mouseYPercent, 0, 1, 700, 900);
    svg.querySelector('circle').setAttribute('cx', newCX);
    svg.querySelector('circle').setAttribute('cy', newCY);
}