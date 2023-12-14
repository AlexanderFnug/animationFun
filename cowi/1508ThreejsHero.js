// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);

// Function to create an extruded triangle
function createTriangle(size, color, positionX, positionY) {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, size);
    shape.lineTo(size, 0);
    shape.lineTo(0, 0);

    const extrudeSettings = {
        steps: 2,
        depth: 4,
        bevelEnabled: false
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshPhongMaterial({ color: color, transparent: true, opacity: 0.8 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(positionX, positionY, 0);
    mesh.rotation.set(-Math.PI / 2, 0, 0);

    return mesh;
}

// Create triangles with different start positions + Remember to set the same start positions in the startPosPattern1 object below
const triangle1 = createTriangle(1, '#F09', -1, -2);
const triangle2 = createTriangle(2, '#F68500', 0, -2);
const triangle3 = createTriangle(3, '#7300E5', 1, -2);

// Add triangles to the scene
scene.add(triangle1);
scene.add(triangle2);
scene.add(triangle3);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

// Camera position
camera.position.z = 6;

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
});

// Camera animation variables
let angle = 0;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Camera orbit animation
  angle += 0.008;
  camera.position.x = Math.cos(angle) * 2; // NOTE TO SELF try different combos of cosinus sinus and tangens
  camera.position.y = Math.cos(-angle) * 5;
  camera.lookAt(scene.position); // Camera always looks at the center of the scene

  renderer.render(scene, camera);
}

animate();
