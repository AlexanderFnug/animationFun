let svg;
// Get the grid container
const grid = document.querySelector(".grid");

// Create 400 divs to create a 20x20 grid
for (let i = 0; i < 400; i++) {
  const div = document.createElement("div");
  div.classList.add("grid-square");
  grid.appendChild(div);
}

function setup() {
     svg = document.querySelector('svg');
    
    console.log(grid);
    createCanvas(width, height);
}
function draw() {
    // Get the mouse position
    let mouseXPercent = map(mouseX, 0, width/2, 725, 750);
    let mouseYPercent = map(mouseY, 0, height/2, 1225, 1250);

    // Set the new size and shape of the SVG element
    let newWidth = map(mouseXPercent, 0, 1, 500, 1000);
    let newHeight = map(mouseYPercent, 0, 1, 300, 700);
    //let newRadius = grid.getAttribute('width')/4
    

    // Update the SVG element with the new size and shape
    svg.querySelector('circle').setAttribute('cx', mouseXPercent);
    svg.querySelector('circle').setAttribute('cy', mouseYPercent);
    //svg.querySelector('circle').setAttribute('r', newRadius);
}