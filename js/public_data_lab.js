if (!Detector.webgl) Detector.addGetWebGLMessage();
var container, stats;
var numberOfParticles = 1500;
var camera, scene, renderer, controls, particles, geometry, materials = [],
    parameters, i, h, color, size, group;
var mouseX = 0,
    mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var accelerometerX, accelerometerY, accelerometerZ;

init();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);
    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.z = 1000;
    controls = new THREE.DeviceOrientationControls(camera);
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xEBFF00);
    geometry = new THREE.Geometry();
    group = new THREE.Group();
    scene.add(group);

    parameters = [
        [
            [1, 1, 0.5], 5
        ],
        [
            [0.95, 1, 0.5], 4
        ],
        [
            [0.90, 1, 0.5], 3
        ],
        [
            [0.85, 1, 0.5], 2
        ],
        [
            [0.80, 1, 0.5], 1
        ]
    ];

    for (i = 0; i < numberOfParticles; i++) {
        var vector = new THREE.Vector3();
        // Scene dimensions
        vector.x = Math.random() * 2000 - 1000;
        vector.y = Math.random() * 2000 - 1000;
        vector.z = Math.random() * 2000 - 1000;
        geometry.vertices.push(vector);
    }

    for (i = 0; i < parameters.length; i++) {
        color = parameters[i][0];
        size = Math.random() * 6 - 1;
        materials[i] = new THREE.PointsMaterial({
            size: size
        });
        particles = new THREE.Points(geometry, materials[i]);
        group.add(particles);
    }

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    // stats = new Stats();
    // container.appendChild(stats.dom);
    window.addEventListener("devicemotion", handleMotionEvent, true);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);
}

function animate() {
    for (i = 0; i < materials.length; i++) {
        color = parameters[i][0];
        materials[i].color.setHex(0xdbd82b);
    }

    group.rotation.y += 0.004;
    camera.lookAt(scene.position);

    camera.position.x += (mouseX - camera.position.x) * 0.02;
    camera.position.y += (-mouseY - camera.position.y) * 0.02;

    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
};

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function handleMotionEvent(event) {
    accelerometerX = Math.round(event.accelerationIncludingGravity.x * 10);
    accelerometerY = Math.round(event.accelerationIncludingGravity.y * 10);

    if (window.innerWidth < window.innerHeight) {
        camera.position.x += (accelerometerX - camera.position.x) * 0.15;
        camera.position.y += (-accelerometerY - camera.position.y) * 0.15;
    } else {
        camera.position.x += (accelerometerY - camera.position.x) * 0.15;
        camera.position.y += (-accelerometerX - camera.position.y) * 0.15;
    }
}

function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;

}

animate();
