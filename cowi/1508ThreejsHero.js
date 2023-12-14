// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);

// Function to create a right-angled triangle
function createTriangle(size, color, positionX, positionY) {
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([
        0, size, 0,  // lower left
        -size, 0, 0,  // lower right (right angle)
        0, 0, 0   // top left
    ]);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const material = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.8 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(positionX, positionY, 0);
    return mesh;
}

// Create triangles with different start positions
const triangle1 = createTriangle(1, '#F09', -1, -2);
const triangle2 = createTriangle(2, '#F69000', 0, -2);
const triangle3 = createTriangle(3, '#7305E5', 1, -2);

// Add triangles to the scene
scene.add(triangle1);  //Pink
scene.add(triangle2);   //Orange
scene.add(triangle3); //Purple

// Camera position
camera.position.z = 5;

// Scroll thresholds
const scrollThresholds = [0.33, 0.66, 1.0];

// Linear interpolation function
function lerp(start, end, factor) {
  return (1 - factor) * start + factor * end;
}

// Start and end positions for each triangle in each pattern
const startPosPattern1 = { triangle1: { x: -1, y: -2 }, triangle2: { x: 0, y: -2 }, triangle3: { x: 1, y: -2 } };
const endPosPattern1 = { triangle1: { x: 0, y: 0 }, triangle2: { x: 0, y: -1 }, triangle3: { x: -1, y: -3 } };

const startPosPattern2 = endPosPattern1;
const endPosPattern2 = { triangle1: { x: 0, y: 0 }, triangle2: { x: -1, y: 0 }, triangle3: { x: 1, y: 1 } };

const startPosPattern3 = endPosPattern2;
const endPosPattern3 = { triangle1: { x: -1, y: 1 }, triangle2: { x: -2, y: 0 }, triangle3: { x: 1, y: 2 } };

// Scroll event listener
document.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const documentHeight = document.body.clientHeight;
    const viewportHeight = window.innerHeight;
    const maxScroll = documentHeight - viewportHeight;
    const scrollFactor = scrollY / maxScroll;

    let normalizedScroll;
    let startPositions, endPositions;

    if (scrollFactor < scrollThresholds[0]) {
        normalizedScroll = scrollFactor / scrollThresholds[0];
        startPositions = startPosPattern1;
        endPositions = endPosPattern1;
    } else if (scrollFactor < scrollThresholds[1]) {
        normalizedScroll = (scrollFactor - scrollThresholds[0]) / (scrollThresholds[1] - scrollThresholds[0]);
        startPositions = startPosPattern2;
        endPositions = endPosPattern2;
    } else {
        normalizedScroll = (scrollFactor - scrollThresholds[1]) / (scrollThresholds[2] - scrollThresholds[1]);
        startPositions = startPosPattern3;
        endPositions = endPosPattern3;
    }

    // Interpolate positions across thresholds
    triangle1.position.x = lerp(startPositions.triangle1.x, endPositions.triangle1.x, normalizedScroll);
    triangle1.position.y = lerp(startPositions.triangle1.y, endPositions.triangle1.y, normalizedScroll);
    triangle2.position.x = lerp(startPositions.triangle2.x, endPositions.triangle2.x, normalizedScroll);
    triangle2.position.y = lerp(startPositions.triangle2.y, endPositions.triangle2.y, normalizedScroll);
    triangle3.position.x = lerp(startPositions.triangle3.x, endPositions.triangle3.x, normalizedScroll);
    triangle3.position.y = lerp(startPositions.triangle3.y, endPositions.triangle3.y, normalizedScroll);

    // Adjust transparency
    const newOpacity = 0.8 ;
    triangle1.material.opacity = newOpacity;
    triangle2.material.opacity = newOpacity;
    triangle3.material.opacity = newOpacity;
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
