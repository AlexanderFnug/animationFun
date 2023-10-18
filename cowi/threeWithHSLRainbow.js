// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);

// Create the grid of squares
const gridSize = 100;
const squareSize = 1;
const squares = [];

for (let x = -gridSize / 2; x < gridSize / 2; x++) {
    for (let y = -gridSize / 2; y < gridSize / 2; y++) {
        const squareGeometry = new THREE.BoxGeometry(squareSize, squareSize, squareSize);
        const squareMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true });
        const square = new THREE.Mesh(squareGeometry, squareMaterial);
        square.position.set(x * squareSize, y * squareSize, 0);
        squares.push(square);
        scene.add(square);
    }
}

// Set the initial opacity of each square to 0
squares.forEach(square => square.material.opacity = 0);

// Add a mousemove event listener to the renderer
renderer.domElement.addEventListener('mousemove', event => {
  // Calculate the mouse position relative to the renderer
  const rect = renderer.domElement.getBoundingClientRect();
  const mouse = {
    x: (event.clientX - rect.left) / rect.width * 2 - 1,
    y: (event.clientY - rect.top) / rect.height * -2 + 1,
  };

  // For each square, calculate the distance between the square's center and the mouse position
  squares.forEach(square => {
    const distance = square.position.distanceTo(new THREE.Vector3(mouse.x, mouse.y, 0));

    // Set the opacity of the square to a value between 0 and 1 based on the distance
    square.material.opacity = Math.max(0.5, 0 - distance / 2);

    // Set the color of the square based on the distance
    
    square.material.color.setHSL(distance / 10, 1, 0.5);

    // Move the square based on the distance
    const movement = new THREE.Vector3(mouse.x, mouse.y, 0).sub(square.position).multiplyScalar(0.001);
    square.position.add(movement);
  });
});
renderer.domElement.addEventListener('mouseover', event => {
  event.square.setRGB(0, 0, 0);
});

// Render the scene
camera.position.z = 20;
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();