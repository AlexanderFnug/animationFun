let svg;
let width = window.innerWidth;
let height = window.innerHeight;

function setup() {
     svg = document.querySelector('svg');
    
}
function draw() {
    // Get the mouse position
    let mouseXPercent = mouseX / width;
    let mouseYPercent = mouseY / height;

    // Set the new position of the SVG circle
    let newCX = map(mouseXPercent, 0, 1, 600, 1200);
    let newCY = map(mouseYPercent, 0, 1, 600, 1200);
    svg.querySelector('circle').setAttribute('cx', newCX);
    svg.querySelector('circle').setAttribute('cy', newCY);
}